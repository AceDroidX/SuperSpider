<template>
    <v-app dark>
        <v-app-bar
            :collapse="!drawer"
            :collapse-on-scroll="false"
            scroll-target="#scrolling-techniques-6"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <ThemeBtn />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" width="400">
            <BiliSCLogo class="pb-4" :version="version" />
            <v-divider></v-divider>
            <v-container>
                <v-row no-gutters align="center">
                    <v-col> 标记显示 </v-col>
                    <v-col>
                        <v-switch
                            v-model="store.showMarkNative"
                            hide-details="auto"
                            flat
                            density="compact"
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 显示数量 </v-col>
                    <v-col>
                        <v-text-field
                            v-model="store.pageLimit"
                            variant="underlined"
                            hide-details="auto"
                            density="compact"
                            class="pb-3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 房间号 </v-col>
                    <v-col>
                        <v-select
                            v-model="store.room"
                            :items="roomlist"
                            variant="underlined"
                            hide-details="auto"
                            density="compact"
                            class="pb-3"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-spacer />
                    </v-col>
                    <v-col cols="6">
                        <v-btn
                            block
                            variant="outlined"
                            @click="store.startFetch += 1"
                            >GO</v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row justify="space-around">
                    <v-col cols="4">
                        <v-btn
                            block
                            variant="outlined"
                            @click="openMiniViewer()"
                            >小窗模式</v-btn
                        >
                    </v-col>
                    <v-col cols="4">
                        <v-btn block variant="outlined" @click="copyURL()"
                            >复制链接</v-btn
                        >
                    </v-col>
                </v-row>
                <v-row justify="space-around">
                    <v-col cols="4">
                        <v-btn
                            block
                            variant="outlined"
                            @click="newVersionDialog = true"
                            >更新日志</v-btn
                        >
                    </v-col>
                    <v-col cols="4">
                        <v-btn block variant="outlined" nuxt to="/history"
                            >历史SC</v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <UsageTips class="pb-3" />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <AuthorCard />
                    </v-col>
                </v-row>
            </v-container>
            <v-dialog
                v-model="newVersionDialog"
                width="500"
                @click:outside="setVersion"
            >
                <v-card>
                    <v-card-title class="text-h5"> 更新日志 </v-card-title>
                    <ChangelogText />
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            variant="text"
                            @click="setVersion"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-navigation-drawer>
        <v-main id="scrolling-techniques-6">
            <v-container>
                <slot />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ViewerConfig } from "@/stores/viewer-config";
import { useDisplay, useTheme } from "vuetify";
const { name: displayName } = useDisplay();
const { current: currentTheme } = useTheme();
const store = ViewerConfig();
const runtimeConfig = useRuntimeConfig();
const roomlist = ref(runtimeConfig.public.ROOM_ID.split(","));
const drawer = ref(true);
const title = ref("BiliSC");
const newVersionDialog = ref(false);
const version = ref("null");

onMounted(() => {
    version.value = runtimeConfig.public.version;
    const localVersion = localStorage.getItem("version");
    if (version.value !== localVersion) {
        console.log("version changed");
        newVersionDialog.value = true;
    }
});

watch(
    () => store.startFetch,
    (newval) => {
        switch (displayName.value) {
            case "xs":
            case "sm":
                drawer.value = false;
                break;
        }
    }
);

function miniViewerURL() {
    return `/mini?room=${store.room}&limit=${store.pageLimit}&mark=${store.showMarkNative}&dark=${currentTheme.value.dark}`;
}
function setVersion() {
    localStorage.setItem("version", runtimeConfig.public.version);
    newVersionDialog.value = false;
}
function openLink(link: string | URL | undefined, extra: boolean) {
    if (extra)
        window.open(
            link,
            "BiliSC for OBS",
            "menubar=0,location=0,scrollbars=0,toolbar=0,width=500,height=700"
        );
    else window.open(link);
}
function openMiniViewer() {
    store.startFetch = 0;
    openLink(miniViewerURL(), true);
}
function copyURL() {
    copyText(window.location.origin + miniViewerURL());
}
function copyText(text: string) {
    navigator.clipboard.writeText(text);
}
</script>

<style scoped>
.v-btn--variant-outlined {
    border-color: rgba(var(--v-theme-on-surface), 0.2);
}
.v-card--variant-outlined {
    border-color: rgba(var(--v-theme-on-surface), 0.12);
}
</style>
