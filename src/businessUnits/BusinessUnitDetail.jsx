//@flow
import React from "react";
import { CRUDDetails, ActiveCell } from "src/components";

type Props = {
  id: number,
  item: Object,
  openForm: (number) => void,
  getBusinessUnit: (number) => void
};

export default ({
  id, item, openForm, getBusinessUnit
}: Props) => (
  <CRUDDetails
    id={id}
    item={item}
    openForm={openForm}
    loader={getBusinessUnit}
    editButtonTitle="Edit Business Unit"
  >
    {item &&
    <div className="details">
      <div className="row">
        <div className="col-sm-3">Name:</div>
        <div className="col-sm-3">{item.name}</div>
      </div>
      <div className="row">
        <div className="col-sm-3">Status:</div>
        <div className="col-sm-3"><ActiveCell value={item.status} /></div>
      </div>
    </div>}

  </CRUDDetails>
);
