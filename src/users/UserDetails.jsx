//@flow
import React from "react";
import { withHandlers, compose } from "recompose";
import { boundLifecycle } from "src/recompose-ext";

type Props = {
  item: Object,
  editItem: () => void
};

const Details = ({ item, editItem }: Props) => (
  item ?
    <div className="details">
      <h5>Details for {item.id}</h5>
      <button title="Edit" className="btn btn-default pull-right" onClick={editItem}>
        <span className="edit fa fa-pencil theme" />Edit user
      </button>
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
    </div>
    : <div className="modal-p details">Not found</div>
);

const Component = ({ item, editItem }: { item: Object, editItem: () => void }) => (
  <div id="main-pnl" className="details pnls">
    <Details item={item} editItem={editItem} />
  </div>
);

export default compose(
  boundLifecycle({
    didMount: ({ id, item, fetchUser }) => !item && fetchUser(id)
  }),
  withHandlers({
    editItem: props => () => props.openForm(props.item.id)
  })
)(Component);
