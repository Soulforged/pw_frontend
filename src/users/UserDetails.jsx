//@flow
import React from "react";
import { CRUDDetails } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  loader: (number) => void
};

export default ({
  id, item, openForm, loader
}: Props) => (
  <CRUDDetails
    id={id}
    item={item}
    openForm={openForm}
    loader={loader}
    editButtonTitle="Edit user"
  />
);
