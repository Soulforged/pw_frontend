//@flow
import reducer from "src/dashboard/reducers";
import mocks from "src/mocks";

it("sets fetching when request", () => {
  const newState = reducer({}, { type: "DASHBOARD_SUMMARY_REQUEST", key: "summary" });
  expect(newState).toEqual({ summary: { fetching: true } });
});

it("loads summary on success", () => {
  const { summary } = mocks;
  const newState = reducer(
    { summary: { fetching: true } },
    { type: "DASHBOARD_SUMMARY_SUCCESS", key: "summary", response: summary }
  );
  expect(newState).toEqual({ summary: summary.results[0] });
});

it("loads errors/exceptions on success", () => {
  const { errors } = mocks;
  const newState = reducer(
    { errors: { fetching: true } },
    { type: "DASHBOARD_ERRORS_SUCCESS", key: "errors", response: errors }
  );
  expect(newState).toEqual({ errors });
});

it("loads trendsByDate on success", () => {
  const { trendsByDate } = mocks;
  const newState = reducer(
    { trendsByDate: { fetching: true } },
    { type: "DASHBOARD_TRENDS_BY_DATE_SUCCESS", key: "trendsByDate", response: trendsByDate }
  );
  expect(newState).toEqual({ trendsByDate: trendsByDate.results });
});

it("loads trendsByInstitution on success", () => {
  const { trendsByInstitution } = mocks;
  const newState = reducer(
    { trendsByInstitution: { fetching: true } },
    { type: "DASHBOARD_TRENDS_BY_INSTITUTION_SUCCESS", key: "trendsByInstitution", response: trendsByInstitution }
  );
  expect(newState).toEqual({ trendsByInstitution: trendsByInstitution.results });
});
