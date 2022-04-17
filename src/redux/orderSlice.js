import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { databaseAPI, mapAPI } from "../api/api";

const initialState = {
  citiesData: [],
  pointsData: [],
  selectedCity: null,
  selectedPoint: null,
  stateStatus: null,
  stateError: null,
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
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    setSelectedPoint(state, action) {
      state.selectedPoint = action.payload;
    },
  },
  extraReducers: {
    [getCities.pending]: (state) => {
      state.stateStatus = "loading";
      state.stateError = null;
    },
    [getCities.fulfilled]: (state) => {
      state.stateStatus = "resolved";
    },
    [getCities.rejected]: (state, action) => {
      state.stateStatus = "rejected";
      state.stateError = action.payload;
    },
    [getPoints.pending]: (state) => {
      state.stateStatus = "loading";
      state.stateError = null;
    },
    [getPoints.fulfilled]: (state) => {
      state.stateStatus = "resolved";
    },
    [getPoints.rejected]: (state, action) => {
      state.stateStatus = "rejected";
      state.stateError = action.payload;
    },
  },
});

export const { setCities, setPoints, setSelectedCity, setSelectedPoint } =
  orderSlice.actions;

export default orderSlice.reducer;
