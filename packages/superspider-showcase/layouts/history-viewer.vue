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
                            v-model="showMarkNative"
                            hide-details="auto"
                            flat
                            density="compact"
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 房间号 </v-col>
                    <v-col>
                        <v-select
                            v-model="room"
                            :items="roomlist"
                            variant="underlined"
                            hide-details="auto"
                            density="compact"
                            class="pb-3"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 开始时间 </v-col>
                    <v-col>
                        <Datepicker
                            v-model="startTime"
                            placeholder="Start Typing ..."
                            text-input
                            auto-apply
                            :dark="$vuetify.theme.current.dark"
                            :format="format"
                            :clearable="false"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 截止时间 </v-col>
                    <v-col>
                        <Datepicker
                            v-model="endTime"
                            placeholder="Start Typing ..."
                            text-input
                            auto-apply
                            :dark="$vuetify.theme.current.dark"
                            :format="format"
                            :clearable="false"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-spacer />
                    </v-col>
                    <v-col cols="6">
                        <v-btn block variant="outlined" @click="startFetch += 1"
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
                            @click="newVersionDialog = true"
                            >更新日志</v-btn
                        >
                    </v-col>
                    <v-col cols="4">
                        <v-btn block variant="outlined" nuxt to="/"
                            >实时SC</v-btn
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { HistoryViewerConfig } from "@/stores/viewer-config";
const store = HistoryViewerConfig();
const format = ref("yyyy.MM.dd HH:mm");
const startTime = ref(new Date());
const endTime = ref(new Date());
watch([startTime, endTime], ([newStart, newEnd]) => {
    store.startTS = newStart.getTime() / 1000;
    store.endTS = newEnd.getTime() / 1000;
});
</script>

<script lang="ts">
import { mapWritableState } from "pinia";
export default {
    name: "HistorySCViewerLayout",
    data() {
        return {
            roomlist: this.$config.public.ROOM_ID.split(","),
            drawer: true,
            title: "BiliSC",
            newVersionDialog: false,
            version: "null",
        };
    },
    computed: {
        ...mapWritableState(HistoryViewerConfig, [
            "room",
            "pageLimit",
            "showMarkNative",
            "startFetch",
            "startTS",
            "endTS",
        ]),
    },
    watch: {
        startFetch() {
            switch (this.$vuetify.display.name) {
                case "xs":
                case "sm":
                    this.drawer = false;
                    break;
            }
        },
    },
    mounted() {
        this.version = this.$config.public.version;
        const version = localStorage.getItem("version");
        if (this.$config.version !== version) {
            console.log("version changed");
            this.newVersionDialog = true;
        }
    },
    methods: {
        log(value: any) {
            console.log(value);
        },
        setVersion() {
            localStorage.setItem("version", this.$config.public.version);
            this.newVersionDialog = false;
        },
    },
};
</script>

<style scoped>
.v-btn--variant-outlined {
    border-color: rgba(var(--v-theme-on-surface), 0.2);
}
.v-card--variant-outlined {
    border-color: rgba(var(--v-theme-on-surface), 0.12);
}
</style>
