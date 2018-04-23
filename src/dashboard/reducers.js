//@flow
import {
  DASHBOARD_SUMMARY_SUCCESS,
  DASHBOARD_ERRORS_SUCCESS,
  DASHBOARD_TRENDS_BY_DATE_SUCCESS,
  DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS,
} from "./actions";

const initialState = {
  summary: {},
  errors: {
    results: []
  },
  trendsByDate: [],
  trendsByInstitution: []
};

const dashboardReqRegex = /^DASHBOARD_(\w+)_REQUEST$/;

export default (state: Object = initialState, action: Object) => {
  if (dashboardReqRegex.test(action.type)){
    return { ...state, [action.key]: { fetching: true } };
  }
  switch (action.type) {
  case DASHBOARD_SUMMARY_SUCCESS:
    return { ...state, summary: action.response.results[0] };
  case DASHBOARD_TRENDS_BY_DATE_SUCCESS:
    return { ...state, trendsByDate: action.response.results };
  case DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS:
    return { ...state, trendsByInstitution: action.response.results };
  case DASHBOARD_ERRORS_SUCCESS:
    return { ...state, errors: action.response };
  default: return state;
  }
};
