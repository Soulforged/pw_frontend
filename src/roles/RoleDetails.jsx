//@flow
import React from "react";
import { CRUDDetails, ActiveCell } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  fetchRole: (number) => void
};

export default ({
  id, item, openForm, fetchRole
}: Props) => (
  <CRUDDetails
    id={id}
    item={item}
    openForm={openForm}
    loader={fetchRole}
    editButtonTitle="Edit Role"
  >
    {item &&
    <div className="edit-pnl-cnt">
      <div className="row">
        <div className="col-md-6 col-sm-6">Role name:</div>
        <div className="col-md-6 col-sm-6">{item.name}</div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6">Status:</div>
        <div className="col-md-6 col-sm-6"><ActiveCell value={item.status} /></div>
      </div>
    </div>}
  </CRUDDetails>
);
