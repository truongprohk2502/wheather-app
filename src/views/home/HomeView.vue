<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getSearchCitiesApi } from "@/utils/api";
import CityList from "./CityList.vue";
import CityCardSkeleton from "./CityCardSkeleton.vue";

interface ILocation {
  id: string;
  state: string | null;
  city: string;
  country: string;
  placeName: string;
  lat: number;
  lng: number;
}

const searchQuery = ref<string>("");
const searchError = ref<boolean>(false);
const searchResults = ref<ILocation[] | null>(null);
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);

const router = useRouter();

const getSearchResults = () => {
  timeoutRef.value && clearTimeout(timeoutRef.value);
  timeoutRef.value = setTimeout(async () => {
    if (searchQuery.value) {
      try {
        searchError.value = false;

        const result = await getSearchCitiesApi(searchQuery.value);

        searchResults.value = result.data.features.map((item: any) => {
          const locations = item.place_name.split(", ");
          return {
            id: item.id,
            state: locations.length === 3 ? locations[0] : null,
            city: locations.length === 3 ? locations[1] : locations[0],
            country: locations.length === 3 ? locations[2] : locations[1],
            placeName: item.place_name,
            lng: item.geometry.coordinates[0],
            lat: item.geometry.coordinates[1],
          };
        });
      } catch (err) {
        console.error(err);
        searchError.value = true;
      }
    } else {
      searchResults.value = null;
    }
  }, 300);
};

const previewCity = (data: ILocation) => {
  router.push({
    name: "cityView",
    params: {
      city: data.city,
    },
    query: {
      lat: data.lat,
      lng: data.lng,
      preview: "true",
    },
  });
};

const getSavedCitiesQty = () => {
  const storageCities = localStorage.getItem("savedCities");
  if (!storageCities) return 0;
  const savedCities = JSON.parse(storageCities);
  if (!Array.isArray(savedCities)) return 0;
  return savedCities.length;
};
</script>

<template>
  <main class="container text-white">
    <div class="relative mb-8 pt-4">
      <input
        type="text"
        v-model.trim="searchQuery"
        placeholder="Search for a city or state"
        class="w-full border-b bg-transparent px-1 py-2 focus:border-secondary focus:outline-none"
        @input="getSearchResults"
      />
      <ul
        class="absolute top-[66px] w-full bg-secondary px-1 py-2 text-white shadow-md"
        v-if="searchResults"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-else-if="!searchResults.length">No results match your query, try a different term.</p>
        <template v-else>
          <li
            v-for="item in searchResults"
            :key="item.id"
            class="cursor-pointer py-2"
            @click="previewCity(item)"
          >
            {{ item.placeName }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton
            v-for="(_, index) in Array(getSavedCitiesQty()).fill(null)"
            :key="index"
          />
        </template>
      </Suspense>
    </div>
  </main>
</template>
