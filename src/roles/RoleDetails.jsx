//@flow
import React from "react";
import { withHandlers, compose } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import ActiveCell from "src/roles/ActiveCell";

type Props = {
  item: Object,
  editItem: () => void
};

const Details = ({ item, editItem }: Props) => (
  item ?
    <div className="details">
      <h5 className="form-header trebuchet text-center bold">Details for {item.id}
        <button title="Edit" className="add-new-btn pointer pull-right bold" onClick={editItem}>
          <i className="edit fa fa-pencil theme" />Edit Role
        </button>
      </h5>
      <div className="edit-pnl-cnt">
        <div className="row">
          <div className="col-md-6 col-sm-6">Role name:</div>
          <div className="col-md-6 col-sm-6">{item.name}</div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6">Status:</div>
          <div className="col-md-6 col-sm-6"><ActiveCell value={item.status} /></div>
        </div>
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
    didMount: ({ id, item, fetchRole }) => !item && fetchRole(id)
  }),
  withHandlers({
    editItem: props => () => props.openForm(props.item.id)
  })
)(Component);
