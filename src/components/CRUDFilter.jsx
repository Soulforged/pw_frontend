//@flow
import * as React from "react";
import { Form, Text, Select } from "react-form";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import serialize from "form-serialize";

type FilterField = {
  type: string,
  name: string,
  label?: string,
  options?: Array<any>,
  state?: string,
  placeholder?: string
};

type Props = {
  onFilter: (Event) => void,
  children?: React.Node,
  fields: Array<FilterField>
};

const component = ({ type }) => (
  switch(type) {
    "select": <Select />;
    default: <Text />;
  };
);

const shouldConnect = ({ state }, Component) => (
  state ?
    connect((storeState) => storeState[state], () => ({}))(Component)
    : Component
);

const factory = (field) => {
  const Component = component(field);
  const Component1 = shouldConnect(field, Component); 
  return (
    <Component1 field={field.name} className="form-control" placeholder={field.placeholder} options={field.options} />
  );
};

const Filter = (props: Props) => (
  <div id="search-pnl" className="text-left">
    <div id="filter-row">
      <form onSubmit={props.onFilter} className="row">
        {props.fields && props.fields.map(f => (
          <div className={`col-md-${ 11 / props.fields.length }`}>
            <label htmlFor={f.name} className="lbl">
              {f.label ? f.label : f.name }
              {factory(f)}
            </label>
          </div>
        ))}
        {props.children}
        <div className="col-md-1 col-sm-1 text-right pull-right">
          <button id="filter-btn" className="btn" type="submit">GO</button>
        </div>
      </form>
    </div>
  </div>
);

Filter.defaultProps = {
  children: false
};

export default withHandlers({
  onFilter: props => (event) => {
    event.preventDefault();
    const params = serialize(event.target, { hash: true });
    props.filter(params);
  }
})(Filter);
