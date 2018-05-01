//@flow
import React from "react";
import { CRUD, CRUDFilter, ActiveCell } from "src/components";

type Props = {
  openForm: () => void,
  fetchUserByCriteria: (Object) => void,
  users: Object,
  showDetails: (id: number) => void,
  fetchUsers: (Object) => void
}

const columns = [
  { Header: "ID", accessor: "id", maxWidth: 50 },
  { Header: "First name", accessor: "firstName" },
  { Header: "Last name", accessor: "lastName" },
  { Header: "Username", accessor: "userName" },
  { Header: "Mobile number", accessor: "mobileNumber" },
  { Header: "Primary email", accessor: "primaryEmail" },
  { Header: "Business unit", accessor: "businessUnitName" },
  { Header: "Role", accessor: "roleName" },
  { Header: "Status", accessor: "status", Cell: ActiveCell },
];

const filterFields = [
  {
    name: "criteria",
    label: "Search criteria",
    type: "select",
    options: [
      { value: "userName", label: "User name" },
      { value: "businessunit", label: "Business unit" },
    ]
  },
  {
    name: "filter",
    label: "Search text"
  },
  {
    name: "filter",
    label: "Business unit",
    type: "select",
    options: []
  }
];

// const Filter = ({ fetchUserByCriteria }: { fetchUserByCriteria: (Object) => void }) => (
//   <CRUDFilter filter={fetchUserByCriteria}>
//
//   </CRUDFilter>
// );

export default (props: Props) => (
  <CRUD
    title="Back office users"
    createButtonTitle="New user"
    openForm={props.openForm}
    filter={<CRUDFilter filter={props.fetchUserByCriteria} fields={filterFields} />}
    columns={columns}
    showDetails={props.showDetails}
    entities={props.users}
    loader={props.fetchUsers}
  />
);
