//@flow
import { CALL_API } from "src/constants";
import moment from "moment";

export const DASHBOARD_SUMMARY_SUCCESS = "DASHBOARD_SUMMARY_SUCCESS";
export const DASHBOARD_TRENDS_BY_DATE_SUCCESS = "DASHBOARD_TRENDS_BY_DATE_SUCCESS";
export const DASHBOARD_TRENDS_BY_INST_SUCCESS = "DASHBOARD_TRENDS_BY_INST_SUCCESS";
export const DASHBOARD_ERRORS_SUCCESS = "DASHBOARD_ERRORS_SUCCESS";

const now = moment();
const dateTo = now.format("YYYY-MM-DD");
const dateFrom = now.subtract(7, "days").format("YYYY-MM-DD");

export const fetchSummary = (params = { dateFrom, dateTo }) => ({
  [CALL_API]: {
    types: ["DASHBOARD_SUMMARY_REQUEST", DASHBOARD_SUMMARY_SUCCESS, "DASHBOARD_SUMMARY_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params.dateFrom}&date_to=${params.dateTo}&distinct=sender_account_number`
  }
});

export const fetchTrendsByDate = (params = { dateFrom, dateTo }) => ({
  [CALL_API]: {
    types: ["DASHBOARD_TRENDS_BY_DATE_REQUEST", DASHBOARD_TRENDS_BY_DATE_SUCCESS, "DASHBOARD_TRENDS_BY_DATE_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params.dateFrom}&date_to=${params.dateTo}&group_by=date`
  }
});

export const fetchTrendsByInstitution = (params = { dateFrom, dateTo }) => ({
  [CALL_API]: {
    types: ["DASHBOARD_TRENDS_BY_INST_REQUEST", DASHBOARD_TRENDS_BY_INST_SUCCESS, "DASHBOARD_TRENDS_BY_INST_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params.dateFrom}&date_to=${params.dateTo}&group_by=institution_name`
  }
});

export const fetchErrors = (params = { dateFrom, dateTo }) => ({
  [CALL_API]: {
    types: ["DASHBOARD_ERRORS_REQUEST", DASHBOARD_ERRORS_SUCCESS, "DASHBOARD_ERRORS_FAILURE"],
    endpoint: `/bi/totals/transactions?date_from=${params.dateFrom}&date_to=${params.dateTo}&group_by=status&status=ERROR`
  }
});
