//@flow
import React from "react";
import { Form, Text, Select, RadioGroup, Radio } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

type Props = {
  item: Object,
  saveBusinessUnit: (Object) => void,
  saving: boolean,
  edition: boolean,
  closeForm: () => void
};

const institutionOption = [
  { value: 2, label: "MPESA" },
  { value: 3, label: "PAMBAZUKA" },
  { value: 4, label: "AIRTEL" },
  { value: 201887, label: "FNB" },
  { value: 201888, label: "Institution X" },
  { value: 201900, label: "FrtNB" },
  { value: 202121, label: "REW" }
];

const merchantOptions = [
  { value: 1, label: "SPORTPESA" },
  { value: 102, label: "Me2rchant Name" },
  { value: 200, label: "80Merchant Name" },
  { value: 201, label: "81Merchant Name" },
  { value: 105, label: "4Merchant Name" },
  { value: 114, label: "13Merchant Name" },
  { value: 5609, label: "r8Merchant Name" }
];

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

const additinionalValues = values => ({ ...values, status: 1, companyId: 1 });

const validate = values => (
  {
    institutionId: {
      error: values.companyType === "Institution" && !values.institutionId && "Institution is required"
    },
    merchantId: {
      error: values.companyType === "Merchant" && !values.merchantId && "Merchant is required"
    }
  }
);

const Component = (props: Props) => {
  const {
    item,
    saving,
    saveBusinessUnit,
    edition = item.id,
    closeForm
  } = props;
  return (
    <div id="trans-new">
      <h2 className="form-header trebuchet text-center bold">
        New Business Unit
        <button onClick={closeForm} className="add-new pointer pull-right bold">
          <i className="fa fa-close theme" />
        </button>
      </h2>
      <div className="add-pnl-cnt">
        <Form
          defaultValues={{ ...item, companyType: item.companyType || "Merchant" }}
          onSubmit={saveBusinessUnit}
          preValidate={additinionalValues}
          validate={validate}
        >
          {formApi => (
            <form id="business_unit_frm" onSubmit={formApi.submitForm}>
              <article className="row modal-p">
                <div className="col-md-6 col-sm-6">
                  <label htmlFor="name">Name:</label>
                </div>
                <div className="col-md-6 col-sm-6">
                  <Text
                    id="name"
                    className="form-control"
                    field="name"
                    required
                    placeholder="Business Unit Name"
                  />
                </div>
              </article>
              {edition &&
              <article className="row modal-p hidden">
                <div className="col-md-6 col-sm-6">
                  <label htmlFor="status">Status</label>
                </div>
                <div className="col-md-6 col-sm-6">
                  <Select
                    id="status"
                    className="form-control"
                    field="status"
                    options={statusOptions}
                  />
                </div>
              </article>}
              {!edition &&
              <article className="row modal-p">
                <div className="col-md-6 col-sm-6"><label>Company Type</label></div>
                <div className="col-md-6 col-sm-6 radios">
                  <RadioGroup field="companyType">
                    <Radio id="merchantRadio" value="Merchant" />
                    <label htmlFor="merchantRadio">Merchant</label>
                    <Radio id="instRadio" value="Institution" />
                    <label htmlFor="instRadio">Institution</label>
                  </RadioGroup>
                </div>
              </article>}
              {!edition && formApi.values.companyType === "Merchant" &&
              <article id="merchant-div" className="row modal-p">
                <div className="col-md-6 col-sm-6"><label>Merchant</label></div>
                <div className="col-md-6 col-sm-6">
                  <Select
                    id="merchant"
                    className="form-control"
                    field="merchantId"
                    options={merchantOptions}
                  />
                </div>
              </article>}
              {!edition && formApi.values.companyType === "Institution" &&
              <article id="instut-div" className="row modal-p hidden">
                <div className="col-md-6 col-sm-6"><label>Institution</label></div>
                <div className="col-md-6 col-sm-6">
                  <Select
                    id="instut"
                    className="form-control"
                    field="institutionId"
                    options={institutionOption}
                  />
                </div>
              </article>}
              <div>
                {formApi.errors &&
                  Object.keys(formApi.errors)
                    .map(k => formApi.touched[k] && <div key={k}>{formApi.errors[k]}</div>)}
              </div>
              <hr />
              <article className="row modal-p text-center">
                <ButtonOrLoading saving={saving} />
              </article>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

const SpecLoading = () => <Loading loading />;
const NoData = () => <div id="main-pnl" className="pnls">Not found</div>;

export default compose(
  boundLifecycle({
    didMount: ({ id, getBusinessUnit, item }) => !item && getBusinessUnit(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
