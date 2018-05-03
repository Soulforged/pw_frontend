//@flow
import * as React from "react";
import { withHandlers, compose } from "recompose";
import { boundLifecycle } from "src/recompose-ext";

type Props = {
  item: Object,
  editItem: () => void,
  editButtonTitle: string,
  fields?: Object,
  children?: React.Node
};

const createLabel = (name, field) => (
  field && field.label ?
    field.label
    : name.humanize().capitalize()
);

const createContent = (name, item, field) => (
  field && field.component ?
    <component item={item} />
    : item[name]
);

const Details = (props: Props) => (
  props.item ?
    <div className="details">
      <h5 className="form-header trebuchet text-center bold">Details for {props.item.id}
        <button title="Edit" className="add-new-btn pointer pull-right bold" onClick={props.editItem}>
          <i className="edit fa fa-pencil theme" />{props.editButtonTitle}
        </button>
      </h5>
      <div className="edit-pnl-cnt">
        {Object.keys(props.item).map(f => (
          <div className="row" key={f}>
            <div className="col-sm-6">{createLabel(f, props.fields[f])}:</div>
            <div className="col-sm-6">{createContent(f, props.item, props.fields[f])}</div>
          </div>
        ))}
        {props.children}
      </div>
    </div>
    : <div className="modal-p details">Not found</div>
);

const Component = props => (
  <div id="main-pnl" className="details pnls">
    <Details {...props} />
  </div>
);

Details.defaultProps = {
  children: false,
  fields: {}
};

export default compose(
  boundLifecycle({
    didMount: ({ id, item, loader }) => !item && loader(id)
  }),
  withHandlers({
    editItem: props => () => props.openForm(props.item.id)
  })
)(Component);
