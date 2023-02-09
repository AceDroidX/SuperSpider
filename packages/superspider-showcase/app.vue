<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();
const btnBorderColor = computed(() =>
    theme.current.value.dark
        ? "rgba(255, 255, 255, 0.20)"
        : "rgba(0, 0, 0, 0.20)"
);
const cardBorderColor = computed(() =>
    theme.current.value.dark
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"
);
</script>

<style>
.v-btn--variant-outlined {
    border-color: v-bind("btnBorderColor");
}
.v-card--variant-outlined {
    border-color: v-bind("cardBorderColor");
}
</style>
