//@flow
import * as React from "react";
import { withHandlers } from "recompose";
import serialize from "form-serialize";

type Props = {
  onFilter: (Event) => void,
  children: React.Node | Array<React.Node>
};

const Filter = (props: Props) => (
  <div id="search-pnl" className="text-left">
    <div id="filter-row">
      <form onSubmit={props.onFilter} className="row">
        {props.children}
        <div className="col-md-1 col-sm-1 text-right">
          <button id="filter-btn" className="btn" type="submit">GO</button>
        </div>
      </form>
    </div>
  </div>
);

export default withHandlers({
  onFilter: props => (event) => {
    event.preventDefault();
    const params = serialize(event.target, { hash: true });
    props.filter(params);
  }
})(Filter);
