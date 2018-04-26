//@flow
import React from "react";
import { withHandlers, compose } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import ActiveCells from "./ActiveCells";

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
        <div className="col-sm-3">Name:</div>
        <div className="col-sm-3">{item.name}</div>
      </div>
      <div className="row">
        <div className="col-sm-3">Status:</div>
        <div className="col-sm-3"><ActiveCells value={item.status} /></div>
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
    didMount: ({ id, item, getBusinessUnit }) => !item && getBusinessUnit(id)
  }),
  withHandlers({
    editItem: props => () => props.openForm(props.item.id)
  })
)(Component);
