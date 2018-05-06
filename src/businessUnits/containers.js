//@flow
import { containerTemplate } from "src/crud";
import actions from "./actions";
import BusinessUnits from "./BusinessUnits";
import BusinessUnitForm from "./BusinessUnitForm";
import BusinessUnitDetail from "./BusinessUnitDetail";

const {
  filter,
  fetchAll,
  fetchOne,
  save
} = actions;

const {
  mainTemplate,
  formTemplate,
  detailTemplate
} = containerTemplate("business_units", { entityName: "businessUnits" });

export const Main = mainTemplate(
  ({ businessUnits }) => ({ businessUnits }),
  dispatch => ({
    loader: () => dispatch(fetchAll()),
    filter: params => dispatch(filter(params))
  })
)(BusinessUnits);

export const Form = formTemplate(
  () => ({}),
  dispatch => ({
    loader: id => id && dispatch(fetchOne(id)),
    save: i => dispatch(save(i))
  })
)(BusinessUnitForm);

export const Detail = detailTemplate({ loader: fetchOne })(BusinessUnitDetail);
