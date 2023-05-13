<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";
import { convertFahrenheittoCelcius } from "@/utils/degrees";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`,
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    weatherData.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.error(err);
  }
};

const weatherData = await getWeatherData();
</script>

<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="w-full bg-secondary p-4 text-center text-white">
      <p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
    </div>
    <!-- Weather overview -->
    <div class="flex flex-col items-center py-12 text-white">
      <h1 class="mb-2 text-4xl">{{ route.params.city }}</h1>
      <p class="mb-12 text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="mb-8 text-8xl">
        {{ Math.round(convertFahrenheittoCelcius(weatherData.current.temp)) }}&deg;
      </p>
      <div class="text-center">
        <p>
          Feels like
          {{ Math.round(convertFahrenheittoCelcius(weatherData.current.feels_like)) }}&deg;
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
          class="h-auto w-[150px]"
        />
      </div>
    </div>
    <hr class="w-full border border-white border-opacity-10" />
    <!-- Hourly weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly weather</h2>
        <div
          class="flex gap-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-primary scrollbar-thumb-secondary"
        >
          <div
            v-for="item in weatherData.hourly"
            :key="item.dt"
            class="flex flex-col items-center gap-4"
          >
            <p class="whitespace-nowrap">
              {{
                new Date(item.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="h-[50px] w-auto object-cover"
              :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(convertFahrenheittoCelcius(item.temp)) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="w-full border border-white border-opacity-10" />
    <!-- Weekly weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div v-for="item in weatherData.daily" :key="item.dt" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(item.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="h-[50px] w-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex flex-1 justify-end gap-2">
            <p>H: {{ Math.round(convertFahrenheittoCelcius(item.temp.max)) }}&deg;</p>
            <p>L: {{ Math.round(convertFahrenheittoCelcius(item.temp.min)) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
