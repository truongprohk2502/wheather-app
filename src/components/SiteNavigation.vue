<script setup lang="ts">
import { RouterLink } from "vue-router";
import SunIcon from "@/icons/SunIcon.vue";
import InfoIcon from "@/icons/InfoIcon.vue";
import PlusIcon from "@/icons/PlusIcon.vue";
</script>

<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex flex-1 items-center gap-3">
          <SunIcon :width="16" :height="16" />
          <p class="text-2xl">The local wheather</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <InfoIcon
          :width="16"
          :height="16"
          class="cursor-pointer duration-150 hover:text-secondary"
        />
        <PlusIcon
          :width="16"
          :height="16"
          class="cursor-pointer duration-150 hover:text-secondary"
        />
      </div>
    </nav>
  </header>
</template>
