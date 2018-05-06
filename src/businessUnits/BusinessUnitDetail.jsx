//@flow
import React from "react";
import { CRUDDetails, ActiveCell } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  loader: (number) => void
};

const fields = {
  name: {},
  status: { component: item => <ActiveCell value={item.status} /> }
};

export default (props: Props) => (
  <CRUDDetails editButtonTitle="Edit Business Unit" {...props} fields={fields} />
);
