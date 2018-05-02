//@flow
import React from "react";
import { CRUDDetails } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  fetchUser: (number) => void
};

export default ({
  id, item, openForm, fetchUser
}: Props) => (
  <CRUDDetails
    id={id}
    item={item}
    openForm={openForm}
    loader={fetchUser}
    editButtonTitle="Edit user"
  />
);
