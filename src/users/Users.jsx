//@flow
import React from "react";
import { withHandlers } from "recompose";
import serialize from "form-serialize";
import UsersList from "./containers/UsersListContainer";
import UserDetails from "./containers/UserDetailsContainer";

const MainComponent = ({ filter, create }: { filter: () => void, create: () => void }) => (
  <div id="user-div">
    <div id="search-pnl" className="text-left">
      <div id="filter-row">
        <form onSubmit={filter} className="row">
          <div className="col-md-3 col-sm-3">
            <label htmlFor="criteria">
              Search criteria
              <select id="criteria" className="form-control" name="criteria" defaultValue="userName">
                <option value="userName">User Name</option>
                <option value="businessunit">Business Unit</option>
              </select>
            </label>
          </div>
          <div className="col-md-4 col-sm-4 txt-div">
            <label htmlFor="filter" className="lbl">
              Search text
              <input name="filter" className="form-control" placeholder="Text to search" />
            </label>
          </div>
          <div className="col-md-4 col-sm-4 slct-div hidden">
            <label htmlFor="srch-bunit" className="lbl">
              Business unit
              <select className="form-control" name="srch-bunit" />
            </label>
          </div>
          <div className="col-md-1 col-sm-1 text-right">
            <button id="filter-btn" className="btn" type="submit">GO</button>
          </div>
        </form>
      </div>
    </div>

    <div id="main-pnl" className="pnls">
      <div id="trans-wrap">
        <h4 className="form-header trebuchet bold">Back Office User(s) List
          <button className="add-new-btn pointer pull-right bold" onClick={create}>
            <i className="fa fa-plus theme" />
            New User
          </button>
        </h4>

        <div className="tbl-wrapper">
          <UsersList />
        </div>

        <UserDetails />
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
  create: ({ openForm }) => () => openForm()
})(MainComponent);
