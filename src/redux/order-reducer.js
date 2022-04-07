import { databaseAPI, mapAPI } from "../api/api";

const SET_CITIES = "order/SET_CITIES";
const SET_POINTS = "order/SET_POINTS";
const SET_SELECTED_CITY = "order/SET_SELECTED_CITY";
const SET_SELECTED_POINT = "order/SET_SELECTED_POINT";

const initialState = {
  cities: [],
  points: [],
  selectedCity: null,
  selectedPoint: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return { ...state, cities: action.cities };
    case SET_POINTS:
      return { ...state, points: action.points };
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: action.city };
    case SET_SELECTED_POINT:
      return { ...state, selectedPoint: action.point };
    default:
      return state;
  }
};

const setCities = (cities) => ({ type: SET_CITIES, cities });
const setPoints = (points) => ({ type: SET_POINTS, points });
export const setSelectedCity = (city) => ({ type: SET_SELECTED_CITY, city });
export const setSelectedPoint = (point) => ({
  type: SET_SELECTED_POINT,
  point,
});

export const getCities = () => {
  return async (dispatch, getState) => {
    let citiesExist = getState().order.cities.length;
    if (!citiesExist) {
      const response = await databaseAPI.getCities();
      let data = await response.data.data;
      data = await Promise.all(
        data.map(async (city) => {
          const coordinate = await Promise.all([
            mapAPI.getCoordinate(city.name),
          ]);
          city.coordinates = await [
            parseFloat(coordinate[0][0]),
            parseFloat(coordinate[0][1]),
          ];
          return await city;
        })
      );
      dispatch(setCities(data));
    }
  };
};

export const getPoints = () => {
  return async (dispatch, getState) => {
    let pointsExist = getState().order.points.length;
    if (!pointsExist) {
      const response = await databaseAPI.getPoints();
      let data = await response.data.data;
      data = await Promise.all(
        data.map(async (point) => {
          if (point.cityId) {
            const coordinate = await Promise.all([
              mapAPI.getCoordinate(point.cityId.name + ", " + point.address),
            ]);
            point.coordinates = await [
              parseFloat(coordinate[0][0]),
              parseFloat(coordinate[0][1]),
            ];
          }
          return await point;
        })
      );
      dispatch(setPoints(data));
    }
  };
};

export default orderReducer;
