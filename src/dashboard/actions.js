//@flow
import actions from "src/actions";
import { CALL_API } from "src/constants";
import moment from "moment";

export const DASHBOARD_SUMMARY_SUCCESS = "DASHBOARD_SUMMARY_SUCCESS";
export const DASHBOARD_TRENDS_BY_DATE_SUCCESS = "DASHBOARD_TRENDS_BY_DATE_SUCCESS";
export const DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS = "DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS";
export const DASHBOARD_ERRORS_SUCCESS = "DASHBOARD_ERRORS_SUCCESS";

const now = moment();
const toDate = now.format("YYYY-MM-DD");
const fromDate = now.subtract(7, "days").format("YYYY-MM-DD");
const defaultParams = { fromDate, toDate };

const params = prms => ({ ...defaultParams, ...prms });

const { fetchTypes } = actions;

type Params = {
  fromDate?: string,
  toDate?: string
}

export const fetchSummary = (prms: Params) => ({
  [CALL_API]: {
    types: fetchTypes("DASHBOARD_SUMMARY"),
    endpoint: `/bi/totals/transactions?date_from=${params(prms).fromDate}&date_to=${params(prms).toDate}&distinct=sender_account_number`,
    key: "summary"
  }
});

export const fetchTrendsByDate = (prms: Params) => ({
  [CALL_API]: {
    types: fetchTypes("DASHBOARD_TRENDS_BY_DATE"),
    endpoint: `/bi/totals/transactions?date_from=${params(prms).fromDate}&date_to=${params(prms).toDate}&group_by=date`,
    key: "trendsByDate"
  }
});

export const fetchTrendsByInstitution = (prms: Params) => ({
  [CALL_API]: {
    types: fetchTypes("DASHBOARD_TRENDS_BY_INSTITUTION"),
    endpoint: `/bi/totals/transactions?date_from=${params(prms).fromDate}&date_to=${params(prms).toDate}&group_by=institution_name`,
    key: "trendsByInstitution"
  }
});

export const fetchErrors = (prms: Params) => ({
  [CALL_API]: {
    types: fetchTypes("DASHBOARD_ERRORS"),
    endpoint: `/bi/totals/transactions?date_from=${params(prms).fromDate}&date_to=${params(prms).toDate}&group_by=status&status=ERROR`,
    key: "errors"
  }
});
