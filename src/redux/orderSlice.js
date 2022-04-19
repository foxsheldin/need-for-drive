import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { databaseAPI, mapAPI } from "../api/api";

const initialState = {
  citiesData: [],
  pointsData: [],
  carsData: [],
  categoriesData: [],
  currentOffset: 0,
  limitLoadingCars: 6,
  totalCars: 0,
  selectedCity: null,
  selectedPoint: null,
  selectedCategoryCars: { id: "0" },
  selectedCar: null,
  stepsOrderBreadcrumbs: [
    {
      nameBreadcrumbs: "Местоположение",
      linkToCurrentStep: "/order/point",
      disabledBreadcrumbs: false,
      nameOrderButton: "Выбрать модель",
      linkToNextStep: "/order/model",
      disabledOrderButton: true,
    },
    {
      nameBreadcrumbs: "Модель",
      linkToCurrentStep: "/order/model",
      disabledBreadcrumbs: true,
      nameOrderButton: "Дополнительно",
      linkToNextStep: "/order/additionally",
      disabledOrderButton: true,
    },
    {
      nameBreadcrumbs: "Дополнительно",
      linkToCurrentStep: "/order/additionally",
      disabledBreadcrumbs: true,
      nameOrderButton: "Итого",
      linkToNextStep: "/order/total",
      disabledOrderButton: true,
    },
    {
      nameBreadcrumbs: "Итого",
      linkToCurrentStep: "/order/total",
      disabledBreadcrumbs: true,
      nameOrderButton: "Заказать",
      linkToNextStep: "#",
      disabledOrderButton: true,
    },
  ],
  isLoading: false,
  stateError: false,
};

export const getCities = createAsyncThunk(
  "order/getCities",
  async (_, { rejectWithValue, dispatch, getState }) => {
    let citiesExist = getState().order.citiesData.length;
    if (!citiesExist) {
      try {
        const errorMessage = "Что-то пошло не так при загрузке городов";
        const response = await databaseAPI.getCities();

        if (response.status !== 200) {
          throw new Error(errorMessage);
        }

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
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPoints = createAsyncThunk(
  "order/getPoints",
  async (_, { rejectWithValue, dispatch, getState }) => {
    let pointsExist = getState().order.pointsData.length;
    if (!pointsExist) {
      try {
        const errorMessage =
          "Что-то пошло не так при загрузке пунктов в городах";
        const response = await databaseAPI.getPoints();

        if (response.status !== 200) {
          throw new Error(errorMessage);
        }

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
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCars = createAsyncThunk(
  "order/getCars",
  async (configQuery, { rejectWithValue, dispatch, getState }) => {
    try {
      const errorMessage = "Что-то пошло не так при загрузке автомобилей";
      let category = getState().order.selectedCategoryCars;
      if (category.id === "0") category = null;
      let response = await databaseAPI.getCars(
        configQuery.offset,
        configQuery.limit,
        category
      );

      if (response.status !== 200) {
        throw new Error(errorMessage);
      }
      dispatch(setTotalCars(response.data.count));
      response = await response.data.data;
      dispatch(setCars(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "order/getCategories",
  async (_, { rejectWithValue, dispatch, getState }) => {
    let categoriesExist = getState().order.categoriesData.length;
    if (!categoriesExist) {
      try {
        const errorMessage = "Что-то пошло не так при загрузке категорий";
        let response = await databaseAPI.getCategories();

        if (response.status !== 200) {
          throw new Error(errorMessage);
        }

        response = await response.data.data;
        response.unshift({ id: "0", name: "Все" });

        dispatch(setCategories(response));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCities(state, action) {
      state.citiesData = action.payload;
    },
    setPoints(state, action) {
      state.pointsData = action.payload;
    },
    setCars(state, action) {
      state.carsData = action.payload;
    },
    setTotalCars(state, action) {
      state.totalCars = action.payload;
    },
    setCategories(state, action) {
      state.categoriesData = action.payload;
    },
    setCurrentOffset(state, action) {
      state.currentOffset = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    setSelectedPoint(state, action) {
      state.selectedPoint = action.payload;
    },
    setSelectedCategoryCars(state, action) {
      state.selectedCategoryCars = action.payload;
    },
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
      state.startDateRate = null;
      state.endDateRate = null;
      state.selectedColor = null;
      state.selectedRate = null;
      state.totalPrice = null;
    },
    setDisabledOrderButton(state, action) {
      state.stepsOrderBreadcrumbs[action.payload.index].disabledOrderButton =
        action.payload.value;
    },
    setDisabledBreadcrumbs(state, action) {
      state.stepsOrderBreadcrumbs[action.payload.index].disabledBreadcrumbs =
        action.payload.value;
    },
  },
  extraReducers: {
    [getCities.pending]: (state) => {
      state.isLoading = true;
    },
    [getCities.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getCities.rejected]: (state, action) => {
      state.isLoading = false;
      state.stateError = action.payload;
    },
    [getPoints.pending]: (state) => {
      state.isLoading = true;
      state.stateError = null;
    },
    [getPoints.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getPoints.rejected]: (state, action) => {
      state.isLoading = false;
      state.stateError = action.payload;
    },
    [getCars.pending]: (state) => {
      state.isLoading = true;
    },
    [getCars.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getCars.rejected]: (state, action) => {
      state.isLoading = false;
      state.stateError = action.payload;
    },
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.stateError = action.payload;
    },
  },
});

export const {
  setCities,
  setPoints,
  setCategories,
  setCars,
  setTotalCars,
  setCurrentOffset,
  setSelectedCity,
  setSelectedPoint,
  setSelectedCategoryCars,
  setSelectedCar,
  setDisabledOrderButton,
  setDisabledBreadcrumbs,
} = orderSlice.actions;

export default orderSlice.reducer;
