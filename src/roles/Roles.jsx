//@flow
import React from "react";
import { CRUD, ActiveCell } from "src/components";

type Props = {
  openForm: () => void,
  roles: Object,
  showDetails: (id: number) => void,
  fetchRoles: (Object) => void
};

const columns = [
  { Header: "ID", accessor: "id", maxWidth: 50 },
  { Header: "Role Name", accessor: "name" },
  { Header: "Status", accessor: "status", Cell: row => <ActiveCell value={row.value} /> }
];

export default (props: Props) => (
  <CRUD
    title="User Role(s) List"
    createButtonTitle="New Role"
    openForm={props.openForm}
    columns={columns}
    showDetails={props.showDetails}
    entities={props.roles}
    loader={props.fetchRoles}
  />
);
