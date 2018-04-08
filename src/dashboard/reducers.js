//@flow
import {
  DASHBOARD_SUMMARY_SUCCESS,
  DASHBOARD_ERRORS_SUCCESS,
  DASHBOARD_TRENDS_BY_DATE_SUCCESS,
  DASHBOARD_TRENDS_BY_INST_SUCCESS
} from "./actions";

const initialState = {
  summary: {},
  errors: {
    results: []
  },
  trendsByDate: [],
  trendsByInstitution: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case DASHBOARD_SUMMARY_SUCCESS:
    return { ...state, summary: action.response.results[0] };
  case DASHBOARD_TRENDS_BY_DATE_SUCCESS:
    return { ...state, trendsByDate: action.response.results };
  case DASHBOARD_TRENDS_BY_INST_SUCCESS:
    return { ...state, trendsByInstitution: action.response.results };
  case DASHBOARD_ERRORS_SUCCESS: return { ...state, errors: action.response };
  default: return state;
  }
};
