import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { databaseAPI, mapAPI } from "../api/api";

const initialState = {
  orderId: null,
  orderStatus: null,
  citiesData: [],
  pointsData: [],
  carsData: [],
  categoriesData: [],
  ratesData: [],
  currentOffset: 0,
  limitLoadingCars: 6,
  totalCars: 0,
  selectedCity: null,
  selectedPoint: null,
  selectedCategoryCars: { id: "0", name: "Все" },
  selectedCar: null,
  selectedColor: null,
  startDateRate: null,
  endDateRate: null,
  selectedRate: null,
  isFullTank: { name: "Полный бак", value: false, price: 500 },
  isNeedChildChair: { name: "Детское кресло", value: false, price: 200 },
  isRightWheel: { name: "Правый руль", value: false, price: 1600 },
  totalPrice: null,
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
      disabledOrderButton: false,
    },
  ],
  isLoading: false,
  stateError: false,
};

export const getCities = createAsyncThunk(
  "order/getCities",
  async (_, { rejectWithValue, dispatch, getState }) => {
    let citiesExist = getState().order.citiesData.length;
    let coordinateExist = getState().order.citiesData.filter(
      (city) => city.coordinates
    ).length;
    if (!citiesExist && !coordinateExist) {
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
    let coordinateExist = getState().order.pointsData.filter(
      (point) => point.coordinates
    ).length;
    if (!pointsExist && !coordinateExist) {
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

export const getRates = createAsyncThunk(
  "order/getRates",
  async (_, { rejectWithValue, dispatch, getState }) => {
    let ratesExist = getState().order.ratesData.length;
    if (!ratesExist) {
      try {
        const errorMessage = "Что-то пошло не так при загрузке категорий";
        let response = await databaseAPI.getRates();

        if (response.status !== 200) {
          throw new Error(errorMessage);
        }

        response = await response.data.data;
        dispatch(setRates(response));
        dispatch(setSelectedRate(response[0]));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const errorMessage = "Что-то пошло не так при загрузке заказа с сервера";
      let response = await databaseAPI.getOrder(orderId);

      if (response.status !== 200) {
        throw new Error(errorMessage);
      }
      console.log(response);

      response = await response.data.data;

      dispatch(setOrderId(orderId));
      dispatch(setOrderStatus(response?.orderStatusId));
      dispatch(setSelectedCity(response?.cityId));
      dispatch(setSelectedPoint(response?.pointId));
      dispatch(setSelectedCar(response?.carId));
      dispatch(setSelectedColor(response?.color));
      dispatch(setSelectedRate(response?.rateId));
      dispatch(setStartDateRate(response?.dateFrom));
      dispatch(setEndDateRate(response?.dateTo));
      dispatch(setFullTank(response?.isFullTank));
      dispatch(setNeedChildChair(response?.isNeedChildChair));
      dispatch(setRightWheel(response?.isRightWheel));
      dispatch(setTotalPrice(response?.price));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue, getState }) => {
    const city = getState().order.selectedCity;
    const point = getState().order.selectedPoint;
    const car = getState().order.selectedCar;
    const color = getState().order.selectedColor;
    const dateFrom = getState().order.startDateRate;
    const dateTo = getState().order.endDateRate;
    const rate = getState().order.selectedRate;
    const price = getState().order.totalPrice;
    const isFullTank = getState().order.isFullTank;
    const isNeedChildChair = getState().order.isNeedChildChair;
    const isRightWheel = getState().order.isRightWheel;

    try {
      const errorMessage = "Что-то пошло не так при отмене заказа";
      let response = await databaseAPI.cancelOrder(
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
      );

      if (response.status !== 200) {
        throw new Error(errorMessage);
      }
      response = await response.data.data.id;
    } catch (error) {
      return rejectWithValue(error.message);
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
    setRates(state, action) {
      state.ratesData = action.payload;
    },
    setCurrentOffset(state, action) {
      state.currentOffset = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
      state.selectedPoint = null;
      state.selectedColor = null;
      state.selectedRate = null;
    },
    setSelectedPoint(state, action) {
      state.selectedPoint = action.payload;
      state.selectedColor = null;
      state.selectedRate = null;
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
    setSelectedColor(state, action) {
      state.selectedColor = action.payload;
    },
    setStartDateRate(state, action) {
      state.startDateRate = action.payload;
    },
    setEndDateRate(state, action) {
      state.endDateRate = action.payload;
    },
    setSelectedRate(state, action) {
      state.selectedRate = action.payload;
    },
    setFullTank(state, action) {
      state.isFullTank.value = action.payload;
    },
    setNeedChildChair(state, action) {
      state.isNeedChildChair.value = action.payload;
    },
    setRightWheel(state, action) {
      state.isRightWheel.value = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload;
    },
    setDisabledOrderButton(state, action) {
      state.stepsOrderBreadcrumbs[action.payload.index].disabledOrderButton =
        action.payload.value;
    },
    setDisabledBreadcrumbs(state, action) {
      state.stepsOrderBreadcrumbs[action.payload.index].disabledBreadcrumbs =
        action.payload.value;
    },
    setError(state, action) {
      state.stateError = action.payload;
    },
    resetOrder(state) {
      state.citiesData = [];
      state.pointsData = [];
      state.orderId = null;
      state.orderStatus = null;
      state.selectedCity = null;
      state.selectedPoint = null;
      state.currentOffset = 0;
      state.selectedCategoryCars = { id: "0", name: "Все" };
      state.selectedCar = null;
      state.selectedColor = "Любой";
      state.selectedRate = state?.ratesData[0];
      state.startDateRate = null;
      state.endDateRate = null;
      state.isFullTank.value = false;
      state.isNeedChildChair.value = false;
      state.isRightWheel.value = false;
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
  setRates,
  setTotalCars,
  setCurrentOffset,
  setSelectedCity,
  setSelectedPoint,
  setSelectedCategoryCars,
  setSelectedCar,
  setSelectedColor,
  setStartDateRate,
  setEndDateRate,
  setSelectedRate,
  setFullTank,
  setNeedChildChair,
  setRightWheel,
  setTotalPrice,
  setOrderId,
  setOrderStatus,
  setDisabledOrderButton,
  setDisabledBreadcrumbs,
  setError,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
