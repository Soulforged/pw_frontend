//@flow
import React from "react";
import { CRUDDetails, ActiveCell } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  fetchRole: (number) => void,
};

const fields = {
  status: {
    component: ({ status }: { status: string }) => <ActiveCell value={status} />
  }
};

export default ({
  id, item, openForm, fetchRole
}: Props) => (
  <CRUDDetails
    id={id}
    item={item}
    openForm={openForm}
    loader={fetchRole}
    fields={fields}
    editButtonTitle="Edit Role"
  />
);
