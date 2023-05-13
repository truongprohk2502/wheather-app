<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNavigation from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-primary font-roboto">
    <SideNavigation />
    <RouterView />
  </div>
</template>
