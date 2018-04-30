//@flow
import React from "react";
import { CRUD, CRUDFilter, ActiveCell } from "src/components";

type Props = {
  openForm: () => void,
  fetchBusinessUnits: (Object) => void,
  businessUnits: Object,
  showDetails: (id: number) => void
};

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Company Type", accessor: "companyType" },
  { Header: "Status", accessor: "status", Cell: ActiveCell },
];

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
    columns={columns}
    showDetails={props.showDetails}
    entities={props.businessUnits}
    loader={props.fetchBusinessUnits}
  />
);
