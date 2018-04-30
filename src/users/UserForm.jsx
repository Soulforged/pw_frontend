//@flow
import React from "react";
import { Form, Text, Select } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const roleOptions = [
  { label: "Choose a role", value: null },
  { label: "A role", value: 1 }
];

type Props = {
  item: Object,
  saveUser: (Object) => void,
  saving: boolean
};

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

type FormApiProps = {
  errors: Object,
  touched: Object
};

const ErrorMessages = ({ errors, touched }: FormApiProps) => (
  <div>
    {errors && Object.keys(errors).map(k => touched[k] && <div key={k}>{errors[k]}</div>)}
  </div>
);

const Component = ({ item, saveUser, saving }: Props) => (
  <div id="main-pnl" className="pnls">
    <h4>{item.id ? `Edit user ${item.id}` : "New user"}</h4>
    <div className="add-pnl-cnt">
      <Form onSubmit={submittedValues => saveUser(submittedValues)} defaultValues={item}>
        {formApi => (
          <form id="user_frm" onSubmit={formApi.submitForm} disabled>
            <div className="row">
              <label htmlFor="firstName">
                First Name:
                <Text
                  field="firstName"
                  id="firstName"
                  className="form-control"
                  placeholder="First name"
                  required
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="lastName">
                Last Name:
                <Text
                  id="lastName"
                  className="form-control"
                  field="lastName"
                  placeholder="Last name"
                  required
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="userName">
                Username:
                <Text
                  id="userName"
                  className="form-control"
                  field="userName"
                  placeholder="Username"
                  required
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="mobileNumber">
                Phone number:
                <Text
                  id="mobileNumber"
                  className="form-control"
                  field="mobileNumber"
                  placeholder="Mobile phone number"
                  required
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="primaryEmail">
                Email:
                <Text
                  id="primaryEmail"
                  className="form-control"
                  field="primaryEmail"
                  placeholder="Email (Optional)"
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="status">
                Status
                <Select
                  id="status"
                  className="form-control"
                  field="status"
                  options={statusOptions}
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="businessUnitName">
                Business Unit
                <Select
                  id="businessUnitName"
                  className="form-control"
                  field="businessUnitName"
                  options={[{ label: "Choose a business unit", value: null }]}
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="roleId">
                Role
                <Select
                  id="roleId"
                  className="form-control"
                  field="roleId"
                  options={roleOptions}
                />
              </label>
            </div>
            <hr />
            <ErrorMessages errors={formApi.errors} touched={formApi.touched} />
            <article className="row modal-p pull-right">
              <ButtonOrLoading saving={saving} />
            </article>
          </form>
        )}
      </Form>
    </div>
  </div>
);

const SpecLoading = () => <Loading loading />;
const NoData = () => <div id="main-pnl" className="pnls">User not found</div>;

export default compose(
  boundLifecycle({
    didMount: ({ id, fetchUser, item }) => !item && fetchUser(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
