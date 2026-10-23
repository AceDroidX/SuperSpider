import { chromium } from "playwright";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import path from "node:path";

// Exercise the production build. All API responses are local fixtures.
const workspace = fileURLToPath(new URL("../../../", import.meta.url));
const artifacts = await fs.mkdtemp(path.join(tmpdir(), "superspider-browser-"));
await fs.mkdir(path.join(artifacts, "screenshots"));
const port = process.env.BROWSER_TEST_PORT || "3264";
const origin = "http://127.0.0.1:" + port;
const server = spawn(
    "node",
    ["packages/superspider-showcase/.output/server/index.mjs"],
    {
        cwd: workspace,
        env: {
            ...process.env,
            PORT: port,
            HOST: "127.0.0.1",
            NUXT_PUBLIC_BASE_API_URL: "http://127.0.0.1:2162/",
        },
        stdio: "ignore",
    },
);
const results = [],
    errors = [],
    requests = [];
let browser;
async function check(name, fn) {
    try {
        await fn();
        results.push({ name, pass: true });
        console.log("PASS", name);
    } catch (e) {
        results.push({ name, pass: false, error: e.message });
        console.log("FAIL", name, e.message);
    }
}
async function assertMatchingButtonStyles(page, labels) {
    const styles = await page.locator('.v-navigation-drawer .v-btn--variant-outlined').evaluateAll(
        (elements, labels) => elements.filter(el => labels.includes(el.textContent.trim())).map(el => {
            const style = getComputedStyle(el);
            const box = el.getBoundingClientRect();
            return { font: style.font, width: box.width, height: box.height };
        }), labels,
    );
    assert.equal(styles.length, labels.length);
    for (const style of styles) assert.deepEqual(style, styles[0]);
}
let mode = "ok",
    sequence = 0;
try {
    for (let i = 0; i < 50; i++) {
        try {
            await fetch(origin);
            break;
        } catch {
            await new Promise((r) => setTimeout(r, 100));
        }
    }
    browser = await chromium.launch({
        executablePath: process.env.CHROMIUM_PATH,
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    console.log("CHROMIUM", browser.version());
    const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        colorScheme: "light",
        // Fix datepicker parsing to UTC+8 regardless of the host timezone.
        timezoneId: "Asia/Shanghai",
    });
    await context.addInitScript(() => {
        if (!localStorage.getItem("version"))
            localStorage.setItem("version", "2.3.0");
    });
    await context.route("**/*", async (route) => {
        const url = new URL(route.request().url());
        if (url.port === "2162") {
            if (!["/sc/getData", "/sc/getDataByTS"].includes(url.pathname)) {
                return route.fulfill({ status: 404, body: "Not Found" });
            }
            requests.push({
                path: url.pathname,
                body: route.request().postData(),
            });
            sequence++;
            if (mode === "error")
                return route.fulfill({
                    status: 500,
                    json: { message: "测试服务错误" },
                });
            return route.fulfill({
                json: [
                    {
                        id: 123456,
                        roomid: 21452505,
                        ts: 1700000000,
                        uid: 1,
                        uname: "浏览器测试用户",
                        avatar: origin + "/icon.png",
                        price: 30,
                        msg: `浏览器测试消息 ${sequence}`,
                        msgjpn: "",
                        bcolor: "#1565c0",
                        pcolor: "#125aac",
                    },
                ],
            });
        } else if (url.hostname === "127.0.0.1") return route.continue();
        else
            return route.fulfill({
                status: 200,
                body: "",
                contentType: "text/css",
            });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    function capture(p) {
        p.on("pageerror", (e) =>
            errors.push({ url: p.url(), message: e.message }),
        );
        p.on("console", (m) => {
            if (m.type() === "error" && mode !== "error")
                errors.push({ url: p.url(), message: m.text() });
        });
    }
    capture(page);
    await page.goto(origin + "/");
    await page.getByRole("button", { name: "GO", exact: true }).waitFor();
    await check("navigation links and action buttons have matching sizes and fonts", async () => {
        await assertMatchingButtonStyles(page, ["小窗模式", "复制链接", "更新日志", "历史SC"]);
    });
    await check("desktop live query and rendering", async () => {
        await page.locator(".v-text-field input[type=text]").first().fill("20");
        await page.getByRole("button", { name: "GO", exact: true }).click();
        await page.locator("#card").waitFor();
        assert.match(requests.at(-1).body, /limit=20/);
        assert.match(await page.locator("main").innerText(), /浏览器测试消息/);
    });
    await check(
        "read mark toggles and IndexedDB persists after reload",
        async () => {
            await page.locator("#card").click();
            await page.waitForTimeout(150);
            assert.equal(
                await page
                    .locator("#header")
                    .evaluate((e) => getComputedStyle(e).backgroundColor),
                "rgb(119, 119, 119)",
            );
            await page.reload();
            await page.getByRole("button", { name: "GO", exact: true }).click();
            await page.locator("#card").waitFor();
            assert.equal(
                await page
                    .locator("#header")
                    .evaluate((e) => getComputedStyle(e).backgroundColor),
                "rgb(119, 119, 119)",
            );
            await page.locator("#card").click();
            await page.waitForTimeout(150);
            assert.notEqual(
                await page
                    .locator("#header")
                    .evaluate((e) => getComputedStyle(e).backgroundColor),
                "rgb(119, 119, 119)",
            );
        },
    );
    await check("settings persist after reload", async () => {
        assert.equal(
            await page
                .locator(".v-text-field input[type=text]")
                .first()
                .inputValue(),
            "20",
        );
        assert.equal(
            JSON.parse(
                await page.evaluate(() => localStorage.getItem("ViewerConfig")),
            ).pageLimit,
            "20",
        );
    });
    await check("light, dark and system themes", async () => {
        const btn = page.locator("header button").last();
        await btn.click();
        await page.waitForTimeout(100);
        assert.ok(
            await page
                .locator(".v-application")
                .evaluate((e) => e.classList.contains("v-theme--dark")),
        );
        await btn.click();
        await page.waitForTimeout(100);
        assert.ok(
            await page
                .locator(".v-application")
                .evaluate((e) => e.classList.contains("v-theme--light")),
        );
        await btn.click();
        await page.emulateMedia({ colorScheme: "dark" });
        await page.waitForTimeout(100);
        assert.ok(
            await page
                .locator(".v-application")
                .evaluate((e) => e.classList.contains("v-theme--dark")),
        );
        await page.emulateMedia({ colorScheme: "light" });
    });
    await check("polling refreshes data", async () => {
        const count = requests.length;
        await page.getByRole("button", { name: "GO", exact: true }).click();
        await page.waitForTimeout(8500);
        assert.ok(requests.length >= count + 2);
        assert.match(
            await page.locator("main").innerText(),
            new RegExp(`浏览器测试消息 ${sequence}`),
        );
    });
    await check("history initial timestamps match visible dates", async () => {
        await page.getByRole("link", { name: "历史SC", exact: true }).click();
        await page.locator(".dp--input").first().waitFor();
        await assertMatchingButtonStyles(page, ["更新日志", "实时SC"]);
        await page.getByRole("button", { name: "GO", exact: true }).click();
        await page.waitForTimeout(300);
        const data = new URLSearchParams(requests.at(-1).body);
        assert.equal(requests.at(-1).path, "/sc/getDataByTS");
        assert.ok(Number(data.get("start")) > 0, requests.at(-1).body);
        assert.ok(Number(data.get("end")) > 0);
    });
    await check("datepicker calendar and typed date bounds", async () => {
        const inputs = page.locator(".dp--input");
        await inputs.first().click();
        assert.ok((await page.locator("[role=dialog]").count()) > 0);
        await page.keyboard.press("Escape");
        await inputs.first().fill("2026.10.01 12:30");
        await inputs.first().press("Enter");
        await page.keyboard.press("Escape");
        await inputs.nth(1).fill("2026.10.02 13:45");
        await inputs.nth(1).press("Enter");
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: "GO", exact: true }).click();
        await page.waitForTimeout(300);
        const data = new URLSearchParams(requests.at(-1).body);
        assert.equal(
            Number(data.get("start")),
            Date.parse("2026-10-01T12:30:00+08:00") / 1000,
        );
        assert.equal(
            Number(data.get("end")),
            Date.parse("2026-10-02T13:45:00+08:00") / 1000,
        );
    });
    await page.screenshot({
        path: path.join(artifacts, "screenshots/history-interactive.png"),
        fullPage: true,
    });
    await check("mini query selects room, limit and light theme", async () => {
        await page.goto(
            origin + "/mini?room=80397&limit=5&dark=false&mark=false",
        );
        await page.locator("#card").waitFor();
        assert.match(requests.at(-1).body, /roomid=80397&limit=5/);
        assert.equal(
            await page
                .locator("#header")
                .evaluate((e) => getComputedStyle(e).backgroundColor),
            "rgb(18, 90, 172)",
        );
    });
    await check("mini dark theme", async () => {
        await page.goto(origin + "/mini?dark=true&mark=false");
        await page.locator("#card").waitFor();
        assert.equal(
            await page
                .locator("#header")
                .evaluate((e) => getComputedStyle(e).backgroundColor),
            "rgb(14, 72, 137)",
        );
    });
    await check("legacy /sc navigation keeps query string", async () => {
        await page.goto(origin + "/sc?room=80397&limit=5");
        await page.waitForURL(origin + "/?room=80397&limit=5");
    });
    await check(
        "mobile drawer closes after GO and no horizontal overflow",
        async () => {
            await page.setViewportSize({ width: 390, height: 844 });
            await page.goto(origin + "/");
            await page.getByRole("button", { name: "GO", exact: true }).click();
            await page.locator("#card").waitFor();
            await page.waitForTimeout(350);
            assert.ok(
                await page
                    .locator(".v-navigation-drawer")
                    .evaluate(
                        (e) =>
                            !e.classList.contains(
                                "v-navigation-drawer--active",
                            ),
                    ),
            );
            assert.ok(
                await page.evaluate(
                    () => document.documentElement.scrollWidth <= innerWidth,
                ),
            );
            await page.screenshot({
                path: path.join(artifacts, "screenshots/mobile.png"),
                fullPage: true,
            });
        },
    );
    await check("server error displays snackbar", async () => {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto(origin + "/");
        mode = "error";
        await page.getByRole("button", { name: "GO", exact: true }).click();
        await page.locator(".v-snackbar--active").waitFor();
        mode = "ok";
    });
    await check("no browser runtime errors", () =>
        assert.deepEqual(errors, []),
    );
    console.log("RESULTS", JSON.stringify(results, null, 2));
    console.log("ERRORS", JSON.stringify(errors));
    await fs.writeFile(
        path.join(artifacts, "results.json"),
        JSON.stringify({ results, errors, requests }, null, 2),
    );
    console.log("Browser test artifacts:", artifacts);
    if (results.some((result) => !result.pass)) process.exitCode = 1;
} finally {
    await browser?.close();
    server.kill();
}
