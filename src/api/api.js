import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-factory.simbirsoft1.com/api/",
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_DB_API_KEY,
    "Access-Control-Max-Age": 3600,
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
  getCars(offset, limit = 6, category = null) {
    return instance.get("db/car", {
      params: {
        offset,
        limit,
        categoryId: category?.id,
      },
    });
  },
  getCategories() {
    return instance.get("db/category");
  },
  getRates() {
    return instance.get("db/rate");
  },
  createOrder(
    city,
    point,
    car,
    color,
    dateFrom,
    dateTo,
    rate,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel
  ) {
    return instance.post("db/order", {
      orderStatusId: {
        name: "Подтвержденные",
        id: "5e26a1f0099b810b946c5d8b",
      },
      cityId: { name: city.name, id: city.id },
      pointId: point.id,
      carId: car.id,
      color: color,
      dateFrom: dateFrom,
      dateTo: dateTo,
      rateId: rate.id,
      price: price,
      isFullTank: isFullTank.value,
      isNeedChildChair: isNeedChildChair.value,
      isRightWheel: isRightWheel.value,
    });
  },
  cancelOrder(
    orderId,
    city,
    point,
    car,
    color,
    dateFrom,
    dateTo,
    rate,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel
  ) {
    return instance.put(`db/order/${orderId}`, {
      orderStatusId: {
        name: "Отмененные",
        id: "5e26a1f5099b810b946c5d8c",
      },
      cityId: { name: city.name, id: city.id },
      pointId: point.id,
      carId: car.id,
      color: color,
      dateFrom: dateFrom,
      dateTo: dateTo,
      rateId: rate.id,
      price: price,
      isFullTank: isFullTank.value,
      isNeedChildChair: isNeedChildChair.value,
      isRightWheel: isRightWheel.value,
    });
  },
  getOrder(orderId) {
    return instance.get(`db/order/${orderId}`);
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
