//@flow
import * as React from "react";
import { withHandlers, compose } from "recompose";
import { boundLifecycle } from "src/recompose-ext";

type Props = {
  item: Object,
  editItem: () => void,
  children?: React.Node,
  editButtonTitle: string
};

const Details = (props: Props) => (
  props.item ?
    <div className="details">
      <h5 className="form-header trebuchet text-center bold">Details for {props.item.id}
        <button title="Edit" className="add-new-btn pointer pull-right bold" onClick={props.editItem}>
          <i className="edit fa fa-pencil theme" />{props.editButtonTitle}
        </button>
      </h5>
      {props.children}
    </div>
    : <div className="modal-p details">Not found</div>
);

const Component = props => (
  <div id="main-pnl" className="details pnls">
    <Details {...props} />
  </div>
);

Details.defaultProps = {
  children: false
};

export default compose(
  boundLifecycle({
    didMount: ({ id, item, loader }) => !item && loader(id)
  }),
  withHandlers({
    editItem: props => () => props.openForm(props.item.id)
  })
)(Component);
