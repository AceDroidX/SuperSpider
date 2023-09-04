<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const theme = useTheme();

const room = computed(
    () => parseFloat(route.query.room?.toString() ?? "21452505") || 21452505
);
const showMarkNative = computed(() =>
    route.query.mark ? route.query.mark === "true" : true
);
const pageLimit = computed(
    () => parseFloat(route.query.limit?.toString() ?? "100") || 100
);
const dark = computed(() =>
    route.query.dark ? route.query.dark === "true" : true
);
definePageMeta({
    name: "MiniSCViewer",
});
useHead({
    title: "BiliSC(mini)",
    titleTemplate: `${room.value} - %s`,
});

let timer: NodeJS.Timer | undefined = undefined;
const rawSCData: any = ref([]);
const snackbar = ref(false);
const snackbarText = ref("Error");
onMounted(async () => {
    theme.global.name.value = dark ? "dark" : "light";
    await startFetchData();
});
onBeforeUnmount(() => stopFetchData());
async function startFetchData() {
    if (!room) return;
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
    try {
        const scData = await useFetch(
            runtimeConfig.BASE_API_URL + "/sc/getData",
            {
                method: "POST",
                body: `roomid=${room.value}&limit=${pageLimit.value}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        rawSCData.value = scData.data;
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
        <SCList :rawscdata="rawSCData.value" :showmarknative="showMarkNative" />
        <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
    </div>
</template>
