//@flow
import React from "react";
import { withHandlers } from "recompose";
import serialize from "form-serialize";
import BusinessUnitList from "./containers/BusinessUnitListContainer";

const MainComponent = ({ filter, openForm }: { filter: () => void, openForm: () => void }) => (
  <div id="user-div">
    <div id="search-pnl" className="text-left">
      <div id="filter-row">
        <form onSubmit={filter} className="row">
          <div className="col-md-11 col-sm-11 txt-div">
            <label htmlFor="filter" className="lbl">
              Search text
              <input name="name" className="form-control" placeholder="Text to search" />
            </label>
          </div>
          <div className="col-md-1 col-sm-1 text-right">
            <button id="filter-btn" className="btn" type="submit">GO</button>
          </div>
        </form>
      </div>
    </div>

    <div id="main-pnl" className="pnls" data-attribute="administration">
      <div id="trans-wrap">
        <h2 className="form-header trebuchet bold">Business Unit List
          <button className="add-new-btn pointer pull-right bold" onClick={openForm}>
            <i className="fa fa-plus theme" />
            New Business Unit
          </button>
        </h2>

        <div className="tbl-wrapper">
          <BusinessUnitList />
        </div>
        <div id="pagination" className="" />
      </div>
    </div>
  </div>
);

export default withHandlers({
  filter: props => (event) => {
    event.preventDefault();
    const params = serialize(event.target, { hash: true });
    props.fetchBusinessUnits(params);
  }
})(MainComponent);
