//@flow
import React from "react";
import { CRUD, CRUDFilter } from "src/components";
import BusinessUnitList from "./containers/BusinessUnitListContainer";

type Props = {
  openForm: () => void,
  fetchBusinessUnits: (Object) => void
};

const Filter = ({ fetchBusinessUnits }: { fetchBusinessUnits: (Object) => void }) => (
  <CRUDFilter filter={fetchBusinessUnits}>
    <div className="col-md-11 col-sm-11 txt-div">
      <label htmlFor="filter" className="lbl">
        Search text
        <input name="name" className="form-control" placeholder="Text to search" />
      </label>
    </div>
  </CRUDFilter>
);

export default (props: Props) => (
  <CRUD
    title="Business Unit List"
    createButtonTitle="New Business Unit"
    openForm={props.openForm}
    filter={<Filter {...props} />}
  >
    <BusinessUnitList />
  </CRUD>
);
