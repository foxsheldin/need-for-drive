import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-factory.simbirsoft1.com/api/",
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_DB_API_KEY,
  },
});

const instanceMap = axios.create({
  baseURL: "https://geocode-maps.yandex.ru/1.x/",
  params: {
    apikey: "931a70df-a373-45ee-ac7b-5c0ee1f2fdf7",
    format: "json",
  },
});

export const databaseAPI = {
  getCities() {
    return instance.get("db/city");
  },
  getPoints() {
    return instance.get("db/point");
  },
};

export const mapAPI = {
  async getCoordinate(name) {
    return await instanceMap.get(`?geocode=${name}`).then((response) => {
      return response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(" ")
        .reverse();
    });
  },
};
