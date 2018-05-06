//@flow
import * as React from "react";
import CRUDList from "./CRUDList";
import CRUDFilter from "./CRUDFilter";

import type { Props as FilterProps } from "./CRUDFilter";

export type Props = {
  title: string,
  createButtonTitle: string,
  openForm: () => void,
  columns: Array<Object>,
  showDetails: (number) => void,
  entities: Object,
  loader: (Object) => void
} & FilterProps;

const CRUD = (props: Props) => (
  <div>
    {props.filter && (
      <CRUDFilter
        filter={props.filter}
        fields={props.fields}
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
