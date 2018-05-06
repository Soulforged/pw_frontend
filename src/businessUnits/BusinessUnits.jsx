//@flow
import React from "react";
import { CRUD, ActiveCell } from "src/components";

import type { Props as CRUDProps } from "src/components/CRUD";

const columns: Array<Object> = [
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

export default (props: CRUDProps) => (
  <CRUD
    title="Business unit list"
    createButtonTitle="New business unit"
    fields={filterFields}
    columns={columns}
    {...props}
  />
);
