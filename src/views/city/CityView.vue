<script setup lang="ts">
import AsyncCityView from "./AsyncCityView.vue";
import CityViewSkeleton from "./CityViewSkeleton.vue";
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>
