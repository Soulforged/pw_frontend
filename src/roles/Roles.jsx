//@flow
import React from "react";
import { CRUD } from "src/components";
import RolesList from "./containers/RolesListContainer";

type Props = {
  openForm: () => void
};

export default (props: Props) => (
  <CRUD
    title="User Role(s) List"
    createButtonTitle="New Role"
    openForm={props.openForm}
  >
    <RolesList />
  </CRUD>
);
