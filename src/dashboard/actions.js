//@flow
import { CALL_API } from "src/constants";
import moment from "moment";
import mocks from "src/mocks";

export const DASHBOARD_SUMMARY_SUCCESS = "DASHBOARD_SUMMARY_SUCCESS";
export const DASHBOARD_TRENDS_BY_DATE_SUCCESS = "DASHBOARD_TRENDS_BY_DATE_SUCCESS";
export const DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS = "DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS";
export const DASHBOARD_ERRORS_SUCCESS = "DASHBOARD_ERRORS_SUCCESS";

const now = moment();
const dateTo = now.format("YYYY-MM-DD");
const dateFrom = now.subtract(7, "days").format("YYYY-MM-DD");
const defaultParams = { dateFrom, dateTo };

const params = prms => ({ ...defaultParams, ...prms });

export const fetchSummary = prms => ({
  [CALL_API]: {
    types: ["DASHBOARD_SUMMARY_REQUEST", DASHBOARD_SUMMARY_SUCCESS, "DASHBOARD_SUMMARY_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params(prms).dateFrom}&date_to=${params(prms).dateTo}&distinct=sender_account_number`,
    //FIXME remove this mock
    mock: mocks.summary,
    key: "summary"
  }
});

export const fetchTrendsByDate = prms => ({
  [CALL_API]: {
    types: ["DASHBOARD_TRENDS_BY_DATE_REQUEST", DASHBOARD_TRENDS_BY_DATE_SUCCESS, "DASHBOARD_TRENDS_BY_DATE_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params(prms).dateFrom}&date_to=${params(prms).dateTo}&group_by=date`,
    mock: mocks.trendsByDate,
    key: "trendsByDate"
  }
});

export const fetchTrendsByInstitution = prms => ({
  [CALL_API]: {
    types: ["DASHBOARD_TRENDS_BY_INSTITUTION_REQUEST", DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS, "DASHBOARD_TRENDS_BY_INST_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params(prms).dateFrom}&date_to=${params(prms).dateTo}&group_by=institution_name`,
    mock: mocks.trendsByInstitution,
    key: "trendsByInstitution"
  }
});

export const fetchErrors = prms => ({
  [CALL_API]: {
    types: ["DASHBOARD_ERRORS_REQUEST", DASHBOARD_ERRORS_SUCCESS, "DASHBOARD_ERRORS_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params(prms).dateFrom}&date_to=${params(prms).dateTo}&group_by=status&status=ERROR`,
    key: "errors"
  }
});
