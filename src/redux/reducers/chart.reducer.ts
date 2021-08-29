import { Chart } from "../types";

import { ActionTypes } from "./../actions/barChart.actions";
import * as types from "../constants/barChart.constant";

const initialState = {
  itemChart: Chart,
  todayPosts: {},
};

const barchartReducer = (state = initialState, action: ActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_TODAY_POST:
      return { ...state, todayPosts: payload, loading: false };

    default:
      return state;
  }
};

export default barchartReducer;
