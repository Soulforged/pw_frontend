//@flow
import React from "react";
import { Form, Text, Select, withFormApi } from "react-form";
import { branch, compose, renderComponent, withHandlers, withState } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

type Props = {
  item: Object,
  // saveRole: (Object) => void,
  saving: boolean,
  edit: boolean,
  checked: boolean,
  closeNew: (Event) => void,
  handleChange: (Event) => void
};

const bunitOptions = [
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

const BusinessUnitSelector = ({ item }: Item) => (
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
        value={item.businessUnitId}
        required
      />
    </div>
  </div>
);

const ComapanyRadio = ({ handleChange, checked }: { handleChange: (Event) => void, checked: boolean }) => (
  <input type="radio" id="radioCompany" value="" checked={!checked} onChange={handleChange} />
);

const Component = (props: Props) => {
  const {
    item,
    // saveRole,
    saving,
    handleChange,
    edit = item.id,
    closeNew,
    checked = item && item.businessUnitId
  } = props;
  return (
    <div>
      <div id="main-pnl" className="pnls">
        <h4 className="form-header trebuchet text-center bold">
          {edit ? `Edit Role ${item.id}` : "New Role"}
          <button className="add-new pointer pull-right bold" onClick={closeNew}>
            <i className="fa fa-close theme" />
          </button>
        </h4>
        <div className="add-pnl-cnt">
          <Form onSubmit={submittedValues => console.log(submittedValues)} defaultValues={item}>
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
                    {withFormApi(ComapanyRadio)}
                    <label htmlFor="radioCompany">Company Wide</label>
                    {withFormApi(<input type="radio" id="radioBu" value="1" checked={checked} onChange={handleChange} />)}
                    <label htmlFor="radioBu">Business Unit Specific</label>
                  </div>
                </div>
                {checked && <BusinessUnitSelector item={item} />}
                {edit && <StatusField item={item} />}
                <hr />
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
  withState("checked", "setChecked", false),
  boundLifecycle({
    didMount: ({ id, fetchRole, item }) => !item && fetchRole(id)
  }),
  withHandlers({
    handleChange: props => (event) => {
      console.log(props);
      console.log(event.target.value);
      if (event.target.value) {
        props.setChecked(true);
      } else {
        props.setChecked(false);
      }
      if (props.formApi && !props.checked) {
        props.formApi.setValue("businessUnitId", null);
      }
    }
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
