import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import orderReducer from "./order-reducer";

const reducers = combineReducers({
  order: orderReducer,
});

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhacers(applyMiddleware(thunkMiddleware))
);

export default store;
