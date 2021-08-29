import { Chart } from "./../types";
import * as types from "../constants/barChart.constant";
import { Dispatch } from "redux";

export type ActionTypes = { type: typeof types.GET_TODAY_POST; payload: {} };

export const getTodayPost = () => async (dispatch: Dispatch) => {
  let url = `http://localhost:5000/charts/todayPosts`;
  const res = await fetch(url);
  const data = await res.json();

  dispatch({
    type: types.GET_TODAY_POST,
    payload: data.data,
  });
};
