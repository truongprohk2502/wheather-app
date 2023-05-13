<script setup lang="ts">
import AsyncCityView from "./AsyncCityView.vue";
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>Loading...</template>
    </Suspense>
  </div>
</template>
