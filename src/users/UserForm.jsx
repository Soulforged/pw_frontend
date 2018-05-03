//@flow
import React from "react";
import { CRUDForm } from "src/components";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

type Props = {
  item: Object,
  saveUser: (Object) => void,
  saving: boolean,
  returnToList: () => void,
  fetchUser: (number) => void,
  fetchBusinessUnits: () => void,
  fetchRoles: () => void
};

const fields = ({ businessUnits, roles }) => [
  { name: "firstName" },
  { name: "lastName" },
  { name: "userName" },
  { name: "mobileNumber" },
  { name: "primaryEmail" },
  { name: "status", options: statusOptions },
  {
    name: "businessUnitId",
    label: "Business unit",
    type: "select",
    options: businessUnits.ids.map(id => ({ value: id, label: businessUnits.byId[id].name }))
  },
  {
    name: "roleId",
    label: "Role",
    type: "select",
    options: roles.ids.map(id => ({ value: id, label: roles.byId[id].name }))
  }
];

export default (props: Props) => (
  <CRUDForm
    entityName="user"
    fields={fields}
    {...props}
  />
);
