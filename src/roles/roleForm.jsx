//@flow
import React from "react";
import { Form, Text, Select } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const roleTypeOptions = [
  { label: "Company Wide", value: 1 },
  { label: "Business Unit Specific", value: 2 }
];

type Props = {
  item: Object,
  saveRole: (Object) => void,
  saving: boolean,
  closeNew: (Event) => void
};

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

const Component = (props: Props) => {
  const {
    item,
    saveRole,
    saving,
    closeNew
  } = props;
  return (
    <div id="dashboard">
      <div id="main-pnl" className="pnls">
        <h4 className="form-header trebuchet text-center bold">
          {item.id ? `Edit Role ${item.id}` : "New Role"}
          <button className="add-new pointer pull-right bold" onClick={closeNew}>
            <i className="fa fa-close theme" />
          </button>
        </h4>
        <div className="add-pnl-cnt">
          <Form onSubmit={submittedValues => saveRole(submittedValues)} defaultValues={item}>
            {formApi => (
              <form id="role_frm" onSubmit={formApi.submitForm} disabled>
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
                    <Select
                      id="roleType"
                      className="form-control"
                      field="roleType"
                      options={roleTypeOptions}
                    />
                  </div>
                </div>
                <div className="row modal-p">
                  <div className="col-md-6 col-sm-6">
                    <label htmlFor="businessUnitName">Business Unit:</label>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <Select
                      id="businessUnitName"
                      className="form-control"
                      field="businessUnitName"
                      options={[{ label: "Choose a business unit", value: null }]}
                    />
                  </div>
                </div>
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
  boundLifecycle({
    didMount: ({ id, fetchRole, item }) => !item && fetchRole(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
