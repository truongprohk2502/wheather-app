<script setup lang="ts">
import { ref } from "vue";
import { getWeatherDataApi } from "@/utils/api";
import CityCard from "./CityCard.vue";

interface IWeather {
  id: string;
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

const savedCities = ref<IWeather[]>([]);

const storageCities = localStorage.getItem("savedCities");
if (storageCities) {
  const citiesList = JSON.parse(storageCities);

  if (Array.isArray(citiesList)) {
    const weatherData = await Promise.all(
      citiesList.map((item) => getWeatherDataApi(item.coords.lat, item.coords.lng)),
    );

    savedCities.value = weatherData.map((item) => item.data);
  }
}
</script>

<template>
  <CityCard
    v-for="item in savedCities"
    :key="item.id"
    :city="item.name"
    :temp="item.main.temp"
    :min-temp="item.main.temp_min"
    :max-temp="item.main.temp_max"
    :lat="item.coord.lat"
    :lng="item.coord.lon"
  />

  <p v-if="!savedCities.length">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
