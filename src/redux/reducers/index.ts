import { combineReducers } from "redux";
import barchartReducer from "./chart.reducer";

export default combineReducers({
  barchart: barchartReducer,
});
