<script setup lang="ts">
import { RouterLink } from "vue-router";
import { convertFahrenheittoCelcius } from "@/utils/degrees";

const { id, city, temp, maxTemp, minTemp, lat, lng } = defineProps<{
  id: string;
  city: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  lat: number;
  lng: number;
}>();
</script>

<template>
  <RouterLink
    :to="{
      name: 'cityView',
      params: { city },
      query: { lat, lng, id },
    }"
  >
    <div class="flex cursor-pointer rounded-md bg-secondary px-3 py-6 shadow-md">
      <div class="flex flex-1 flex-col">
        <h2 class="text-3xl">{{ city }}</h2>
      </div>

      <div class="flex flex-col gap-2">
        <p class="self-end text-3xl">{{ Math.round(convertFahrenheittoCelcius(temp)) }}&deg;</p>
        <div class="flex gap-2">
          <span class="text-xs">
            H:
            {{ Math.round(convertFahrenheittoCelcius(maxTemp)) }}&deg;
          </span>
          <span class="text-xs">
            L:
            {{ Math.round(convertFahrenheittoCelcius(minTemp)) }}&deg;
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
