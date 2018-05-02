//@flow
import * as React from "react";
import CRUDList from "./CRUDList";
import CRUDFilter from "./CRUDFilter";

type Props = {
  title: string,
  createButtonTitle: string,
  openForm: () => void,
  columns: Array<Object>,
  showDetails: (number) => void,
  entities: Object,
  loader: (Object) => void,
  filter?: React.Node,
  filterFields?: Array<Object>,
  defaultFilter?: Object
};

const CRUD = (props: Props) => (
  <div>
    {props.filter && (
      <CRUDFilter
        filter={props.filter}
        fields={props.filterFields}
        defaultFilter={props.defaultFilter}
      />
    )}
    <div id="main-pnl" className="pnls">
      <div>
        <h4 className="form-header trebuchet bold">{props.title}
          <button className="add-new-btn pointer pull-right bold" onClick={props.openForm}>
            <i className="fa fa-plus theme" />
            {props.createButtonTitle}
          </button>
        </h4>

        <div className="tbl-wrapper">
          <CRUDList {...props} />
        </div>
      </div>
    </div>
  </div>
);

CRUD.defaultProps = {
  filter: false,
  filterFields: [],
  defaultFilter: {}
};

export default CRUD;
