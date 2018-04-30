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
  >
    {item &&
      <div>
        <div className="row">
          <div className="col-sm-3">First name:</div>
          <div className="col-sm-3">{item.firstName}</div>
          <div className="col-sm-3">Last name:</div>
          <div className="col-sm-3">{item.lastName}</div>
        </div>
        <div className="row">
          <div className="col-sm-3">Username:</div>
          <div className="col-sm-3">{item.userName}</div>
          <div className="col-sm-3">Phone number:</div>
          <div className="col-sm-3">{item.mobileNumber}</div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-xs-3">Email:</div>
          <div className="col-sm-3">{item.primaryEmail}</div>
          <div className="col-sm-3">Status:</div>
          <div className="col-sm-3">{item.status}</div>
        </div>
        <div className="row">
          <div className="col-sm-3">Business unit:</div>
          <div className="col-sm-3">{item.businessUnitName}</div>
          <div className="col-sm-3">Role:</div>
          <div className="col-sm-3">{item.roleName}</div>
        </div>
      </div>}
  </CRUDDetails>
);
