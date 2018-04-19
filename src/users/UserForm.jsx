//@flow
import React from "react";
import { Form, Text, Select } from "react-form";
import { boundLifecycle } from "src/recompose-ext";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const roleOptions = [
  { label: "Choose a role", value: null },
  { label: "A role", value: 1 }
];

const Component = ({ item }: { item: Object }) => (
  <div id="main-pnl" className="pnls">
    <h4>{item ? `Details for ${item.id}` : "New user"}</h4>
    <div className="add-pnl-cnt">
      <Form onSubmit={submittedValues => console.log(submittedValues)} defaultValues={item}>
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
                  required
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
            <article className="row modal-p pull-right">
              <button type="submit" className="btn btn-default">SAVE</button>
            </article>
          </form>
        )}
      </Form>
    </div>
  </div>
);

export default boundLifecycle({
  didMount: ({ id, fetchUser }) => fetchUser(id)
})(Component);
