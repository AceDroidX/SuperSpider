<template>
    <v-btn icon @click.stop="changeStorageTheme()">
        <v-icon :icon="iconText" />
    </v-btn>
</template>

<script>
export default {
    name: "ThemeBtn",
    data() {
        return {
            iconText: "mdi-brightness-auto",
            themeList: ["auto", "true", "false"],
        };
    },
    mounted() {
        this.setVuetifyTheme();
        this.setIconText();
        this.addBrowserDarkListener();
    },
    methods: {
        changeStorageTheme() {
            if (localStorage.theme == null) {
                localStorage.setItem("theme", "auto");
            }
            console.log(localStorage.theme);
            console.log(this.themeList.indexOf(localStorage.theme));
            console.log(
                this.themeList[this.themeList.indexOf(localStorage.theme) + 1]
            );
            localStorage.setItem(
                "theme",
                this.themeList[
                    (this.themeList.indexOf(localStorage.theme) + 1) %
                        this.themeList.length
                ]
            );
            this.setVuetifyTheme();
            this.setIconText();
        },
        setVuetifyTheme() {
            localStorage.theme !== "true" && localStorage.theme !== "false"
                ? (this.$vuetify.theme.global.name =
                      this.getDarkValueFromBrowser() ? "dark" : "light")
                : (this.$vuetify.theme.global.name =
                      localStorage.theme === "true" ? "dark" : "light");
        },
        setIconText() {
            this.iconText =
                localStorage.theme !== "true" && localStorage.theme !== "false"
                    ? "mdi-brightness-auto"
                    : `mdi-brightness-${
                          localStorage.theme === "true" ? "4" : "6"
                      }`;
        },
        getDarkValueFromBrowser() {
            const mediaQueryListDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            return mediaQueryListDark.matches;
        },
        addBrowserDarkListener() {
            const mediaQueryListDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            mediaQueryListDark.addEventListener("change", (event) => {
                if (
                    localStorage.theme === "true" ||
                    localStorage.theme === "false"
                )
                    return;
                this.$vuetify.theme.global.name = event.matches
                    ? "dark"
                    : "light";
            });
        },
    },
};
</script>

<style></style>
