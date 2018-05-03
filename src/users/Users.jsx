//@flow
import React from "react";
import { CRUD, ActiveCell } from "src/components";

type Props = {
  openForm: () => void,
  users: Object,
  showDetails: (id: number) => void,
  fetchUsers: (Object) => void,
  fetchUserByCriteria: (Object) => void,
  fetchBusinessUnits: () => void
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

const filterFields = ({ businessUnits }) => [
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
    label: "User name",
    type: "text",
    condition: form => form.values.criteria === "userName"
  },
  {
    name: "filter",
    label: "Business unit",
    type: "select",
    condition: form => form.values.criteria === "businessunit",
    options: businessUnits.ids.map(id => ({ value: id, label: businessUnits.byId[id].name }))
  }
];

export default (props: Props) => (
  <CRUD
    title="Back office users"
    createButtonTitle="New user"
    filterFields={filterFields(props)}
    defaultFilter={{ criteria: "userName" }}
    columns={columns}
    {...props}
  />
);
