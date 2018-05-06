//@flow
import React from "react";
import { CRUD, ActiveCell } from "src/components";

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

const filterFields = [
  {
    name: "name",
    label: "Search text",
    placeholder: "Text to search"
  }
];

export default (props: Props) => (
  <CRUD
    title="Business unit list"
    createButtonTitle="New business unit"
    openForm={props.openForm}
    filterFields={filterFields}
    columns={columns}
    {...props}
  />
);
