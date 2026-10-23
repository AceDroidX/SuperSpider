<script setup lang="ts">
import { HistoryViewerConfig } from "@/stores/viewer-config";
const store = HistoryViewerConfig();
const runtimeConfig = useRuntimeConfig();
definePageMeta({
    name: "HistorySCViewer",
    layout: "history-viewer",
});
useHead({
    title: "BiliSC",
    titleTemplate: `${store.room} - %s`,
});
let timer: NodeJS.Timeout | undefined = undefined;
const rawSCData = ref<any[]>([]);
const snackbar = ref(false);
const snackbarText = ref("Error");

onBeforeUnmount(() => stopFetchData());

watch(
    () => store.startFetch,
    (newval) => {
        newval ? startFetchData() : stopFetchData();
    }
);

async function startFetchData() {
    if (!store.room) return;
    console.log("startFetchData");
    await fetchData();
    if (timer) clearTimeout(timer);
    setTimeoutLoop();
}
function setTimeoutLoop() {
    const fn = async () => {
        await fetchData();
        timer = setTimeout(fn, 8000);
    };
    timer = setTimeout(fn, 8000);
}
async function fetchData() {
    if (!store.room || isNaN(Number(store.room)) || store.room === "") return;
    try {
        const scData = await $fetch<any[]>(
            runtimeConfig.public.BASE_API_URL.replace(/\/+$/, "") + "/sc/getDataByTS",
            {
                method: "POST",
                body: `roomid=${store.room}&start=${store.startTS}&end=${store.endTS}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        rawSCData.value = scData;
        console.log(rawSCData);
    } catch (e: any) {
        snackbar.value = true;
        if (e.response !== undefined) {
            if (e.response.data !== undefined)
                snackbarText.value = e.message + "\n" + e.response.data;
            else snackbarText.value = e.name + ": " + e.message;
        } else {
            snackbarText.value = e.name + ": " + e.message;
        }
        console.warn(e);
    }
}
function stopFetchData() {
    if (timer) clearTimeout(timer);
    timer = undefined;
    rawSCData.value = [];
}
</script>

<template>
    <div>
        <SCList
            :rawscdata="rawSCData"
            :showmarknative="store.showMarkNative"
        />
        <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
    </div>
</template>
