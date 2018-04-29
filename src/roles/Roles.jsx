//@flow
import React from "react";
import RolesList from "./containers/RolesListContainer";

export default ({ openForm }: { openForm: () => void }) => (
  <div id="dashboard">
    <div id="role-div">
      <div id="main-pnl" className="pnls">
        <div id="trans-wrap">
          <h4 className="form-header trebuchet bold">User Role(s) List
            <button className="add-new-btn pointer pull-right bold" onClick={openForm}>
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
