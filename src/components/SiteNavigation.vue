<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import SunIcon from "@/icons/SunIcon.vue";
import InfoIcon from "@/icons/InfoIcon.vue";
import PlusIcon from "@/icons/PlusIcon.vue";
import BaseModal from "./BaseModal.vue";

interface ISavedCity {
  id: string;
  city: string;
  coords: {
    lat: number;
    lng: number;
  };
}

const openModal = ref<boolean>(false);
const savedCities = ref<ISavedCity[]>([]);

const route = useRoute();
const router = useRouter();

const addCity = () => {
  const storageCities = localStorage.getItem("savedCities");
  if (storageCities) {
    savedCities.value = JSON.parse(storageCities);
  }

  const cityObj: ISavedCity = {
    id: uid(),
    city: route.params.city as string,
    coords: {
      lat: Number(route.query.lat),
      lng: Number(route.query.lng),
    },
  };

  savedCities.value.push(cityObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  const query = { ...route.query };
  delete query.preview;
  (query.id = cityObj.id), router.replace({ query });
};
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
          @click="openModal = true"
        />
        <PlusIcon
          v-if="route.query.preview"
          :width="16"
          :height="16"
          class="cursor-pointer duration-150 hover:text-secondary"
          @click="addCity"
        />
      </div>
      <BaseModal :open="openModal" @close="openModal = false">
        <div class="text-black">
          <h1 class="mb-1 text-2xl">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather of cities of your
            choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="mb-4 list-inside list-decimal">
            <li>Search for your city by entering the name into the search bar.</li>
            <li>
              Select a city within the results, this will take you to the current weather for your
              selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This will save the city
              to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within the home page. At
            the bottom of the page, there will be am option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
