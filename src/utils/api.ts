import axios from "axios";

export const getWeatherDataApi = (lat: number, lng: number) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&exclude={part}&appid=${
      import.meta.env.VITE_OPEN_WHEATHER_API
    }&units=imperial`,
  );
};

export const getWeatherDetailDataApi = (lat: number, lng: number) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${
      import.meta.env.VITE_OPEN_WHEATHER_API
    }&units=imperial`,
  );
};

export const getSearchCitiesApi = (keyword: string) => {
  return axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${
      import.meta.env.VITE_MAPBOX_KEY
    }&types=place`,
  );
};
