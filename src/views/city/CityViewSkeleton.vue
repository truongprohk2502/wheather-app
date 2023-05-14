<script setup lang="ts">
import Skeleton from "@/components/Skeleton.vue";
</script>

<template>
  <div class="flex flex-1 flex-col">
    <!-- Overview -->
    <div class="flex flex-col items-center py-12">
      <Skeleton class="mb-2 w-full max-w-[300px]" />
      <Skeleton class="mb-12 w-full max-w-[300px]" />
      <Skeleton class="mb-12 h-[100px] w-full max-w-[300px]" />
      <Skeleton class="mb-8 w-full max-w-[300px]" />
      <Skeleton class="h-[75px] w-full max-w-[300px]" />
    </div>
    <!-- Hourly -->
    <div class="flex flex-col items-center px-8 py-12">
      <Skeleton class="mb-12 h-[100px] w-full max-w-screen-md" />
    </div>
    <!-- Weekly -->
    <div class="flex flex-col items-center px-8 py-12">
      <Skeleton class="mb-12 h-[100px] w-full max-w-screen-md" />
    </div>
  </div>
</template>
