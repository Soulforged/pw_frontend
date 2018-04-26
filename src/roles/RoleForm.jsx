//@flow
import React from "react";
import { omit } from "lodash";
import { Form, Text, Select, RadioGroup, Radio } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

type Props = {
  item: Object,
  // saveRole: (Object) => void,
  saving: boolean,
  edit: boolean,
  returnToList: (Event) => void
};

const bunitOptions = [
  { label: "None", value: null },
  { label: "Finance", value: 6 },
  { label: "Accounts", value: 117 },
];

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

type Item = {
  item: Object
};

const StatusField = ({ item }: Item) => (
  <div className="row modal-p">
    <div className="col-md-6 col-sm-6">
      <label htmlFor="status">Status:</label>
    </div>
    <div className="col-md-6 col-sm-6">
      <Select
        id="status"
        className="form-control"
        field="status"
        options={statusOptions}
        value={item.status}
      />
    </div>
  </div>
);

const BusinessUnitSelector = () => (
  <div className="row modal-p">
    <div className="col-md-6 col-sm-6">
      <label htmlFor="businessUnitName">Business Unit:</label>
    </div>
    <div className="col-md-6 col-sm-6">
      <Select
        id="businessUnitName"
        className="form-control"
        field="businessUnitId"
        options={bunitOptions}
        required
      />
    </div>
  </div>
);

const preValidate = values => (values.checked ? values : omit(values, "businessUnitId"));

const validate = values => ({
  businessUnitId: { error: values.checked && !values.businessUnitId && "Must specify business unit" }
});

const ErrorMessage = ({ formApi }: { formApi: Object }) => (
  <div>
    {formApi.errors
      && Object.keys(formApi.errors).map(k => (
        formApi.touched[k] ?
          <div key={k}>{formApi.errors[k]}</div>
          : false
      ))}
  </div>
);

const Component = (props: Props) => {
  const {
    item,
    returnToList,
    saving,
    edit = item.id
  } = props;
  return (
    <div>
      <div id="main-pnl" className="pnls">
        <h4 className="form-header trebuchet text-center bold">
          {edit ? `Edit Role ${item.id}` : "New Role"}
          <button className="add-new pointer pull-right bold" onClick={returnToList}>
            <i className="fa fa-close theme" />
          </button>
        </h4>
        <div className="add-pnl-cnt">
          <Form
            onSubmit={submittedValues => console.log(submittedValues)}
            defaultValues={{ ...item, checked: item.businessUnitId ? "1" : "" }}
            preValidate={preValidate}
            validate={validate}
          >
            {formApi => (
              <form id="role_frm" onSubmit={formApi.submitForm}>
                <div className="row modal-p">
                  <div className="col-md-6 col-sm-6">
                    <label htmlFor="roleName">Role Name:</label>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <Text
                      field="name"
                      id="roleName"
                      className="form-control"
                      placeholder="Role name"
                      required
                    />
                  </div>
                </div>
                <div className="row modal-p">
                  <div className="col-md-6 col-sm-6">
                    <label htmlFor="roleType">Role Type:</label>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <RadioGroup field="checked">
                      <Radio id="radioCompany" value="" />
                      <label htmlFor="radioCompany">Company Wide</label>
                      <Radio id="radioBu" value="1" />
                      <label htmlFor="radioBu">Business Unit Specific</label>
                    </RadioGroup>
                  </div>
                </div>
                {formApi.values.checked && <BusinessUnitSelector item={item} />}
                {edit && <StatusField item={item} />}
                <hr />
                <ErrorMessage formApi={formApi} />
                <article className="modal-p text-center">
                  <ButtonOrLoading saving={saving} />
                </article>
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

const SpecLoading = () => <Loading loading />;
const NoData = () => <div id="main-pnl" className="pnls">Role(s) not found</div>;

export default compose(
  boundLifecycle({
    didMount: ({ id, fetchRole, item }) => !item && fetchRole(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
