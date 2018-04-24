//@flow
import React from "react";
import { withHandlers } from "recompose";
import serialize from "form-serialize";
import RolesList from "./containers/rolesListContainer";

const MainComponent = ({ create }: { create: () => void }) => (
  <div id="dashboard">
    <div id="role-div">
      <div id="main-pnl" className="pnls">
        <div id="trans-wrap">
          <h4 className="form-header trebuchet bold">User Role(s) List
            <button className="add-new-btn pointer pull-right bold" onClick={create}>
              <i className="fa fa-plus theme" />
              New Role
            </button>
          </h4>

          <div className="tbl-wrapper text-center">
            <RolesList />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withHandlers({
  filter: props => (event) => {
    event.preventDefault();
    const params = serialize(event.target, { hash: true });
    props.fetchUserByCriteria(params);
  },
  create: ({ openForm }) => () => openForm(),
})(MainComponent);
