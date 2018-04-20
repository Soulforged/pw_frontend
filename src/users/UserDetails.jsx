//@flow
import React from "react";
import { withHandlers } from "recompose";

type Props = {
  selected: Object,
  editItem: () => void
};

const Details = ({ selected, editItem }: Props) => (
  selected ?
    <div className="modal-p details">
      <h5>Details for {selected.id}</h5>
      <button title="Edit" className="btn btn-default pull-right" onClick={editItem}>
        <span className="edit fa fa-pencil theme" />Edit user
      </button>
      <div className="row">
        <span className="col-sm-3">First name:</span>
        <span className="col-sm-3">{selected.firstName}</span>
        <span className="col-sm-3">Last name:</span>
        <span className="col-sm-3">{selected.lastName}</span>
      </div>
      <div className="row">
        <span className="col-sm-3">Username:</span>
        <span className="col-sm-3">{selected.userName}</span>
        <span className="col-sm-3">Phone number:</span>
        <span className="col-sm-3">{selected.mobileNumber}</span>
      </div>
      <div className="row">
        <span className="col-sm-3">Email:</span>
        <span className="col-sm-3">{selected.primaryEmail}</span>
        <span className="col-sm-3">Status:</span>
        <span className="col-sm-3">{selected.status}</span>
      </div>
      <div className="row">
        <span className="col-sm-3">Business unit:</span>
        <span className="col-sm-3">{selected.businessUnitName}</span>
        <span className="col-sm-3">Role:</span>
        <span className="col-sm-3">{selected.roleName}</span>
      </div>
    </div>
    : <div className="modal-p details">No data to show</div>
);

const Component = ({ selected, editItem }: { selected: Object, editItem: () => void }) => (
  <div id="trans-new">
    <div className="add-pnl-cnt">
      <Details
        selected={selected}
        editItem={editItem}
      />
    </div>
  </div>
);

export default withHandlers({
  editItem: props => () => props.openForm(props.selected.id)
})(Component);
