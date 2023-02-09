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
                            flat="true"
                            density="compact"
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col> 显示数量 </v-col>
                    <v-col>
                        <v-text-field
                            v-model="pageLimit"
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
                            v-model="room"
                            :items="$config.ROOM_ID"
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
                            @click="setStartFetch(startFetch + 1)"
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
                        <v-btn color="primary" text @click="setVersion">
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

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "SCViewerLayout",
    data() {
        return {
            drawer: true,
            right: true,
            rightDrawer: false,
            title: "BiliSC",
            collapseOnScroll: true,
            newVersionDialog: false,
            version: "null",
        };
    },
    computed: {
        room: {
            get() {
                return this.$store.state.ViewerConfig.room;
            },
            set(value) {
                this.$store.commit("ViewerConfig/setRoom", value);
            },
        },
        pageLimit: {
            get() {
                return this.$store.state.ViewerConfig.pageLimit;
            },
            set(value) {
                this.$store.commit("ViewerConfig/setPageLimit", value);
            },
        },
        showMarkNative: {
            get() {
                return this.$store.state.ViewerConfig.showMarkNative;
            },
            set(value) {
                this.$store.commit("ViewerConfig/setShowMarkNative", value);
            },
        },
        miniViewerURL() {
            return `/mini?room=${this.room}&limit=${this.pageLimit}&mark=${this.showMarkNative}&dark=${this.$vuetify.theme.current.dark}`;
        },
        ...mapState("ViewerConfig", ["startFetch"]),
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
        this.version = this.$config.version;
        const version = localStorage.getItem("version");
        if (this.$config.version !== version) {
            console.log("version changed");
            this.newVersionDialog = true;
        }
    },
    methods: {
        ...mapMutations("ViewerConfig", ["setStartFetch"]),
        log(value) {
            console.log(value);
        },
        setVersion() {
            localStorage.setItem("version", this.$config.version);
            this.newVersionDialog = false;
        },
        openLink(link, extra) {
            if (extra)
                window.open(
                    link,
                    "BiliSC for OBS",
                    "menubar=0,location=0,scrollbars=0,toolbar=0,width=500,height=700"
                );
            else window.open(link);
        },
        openMiniViewer() {
            this.setStartFetch(0);
            this.openLink(this.miniViewerURL, true);
        },
        copyURL() {
            this.copyText(window.location.origin + this.miniViewerURL);
        },
        copyText(text) {
            navigator.clipboard.writeText(text);
        },
    },
};
</script>
