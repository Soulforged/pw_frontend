//@flow
import * as React from "react";
import { Form, Text, Select } from "react-form";

type FilterField = {
  type: string,
  name: string,
  label?: string,
  options?: Array<any>,
  state?: string,
  placeholder?: string
};

type Props = {
  children?: React.Node,
  fields: Array<FilterField>,
  filter: (Object) => void
};

const fieldMap = (type) => {
  switch (type) {
  case "select": return Select;
  default: return Text;
  }
};

const component = ({ type, Component }) => (
  Component || fieldMap(type)
);

const factory = (field) => {
  const Component = component(field);
  return (
    <Component
      field={field.name}
      className="form-control"
      {...field}
      required={true && field.required !== false}
    />
  );
};

const colSize = size => Math.round(11 / Math.max(size, 1));

const fieldFactory = (f, size) => (
  <div className={`col-md-${size}`}>
    <label htmlFor={f.name} className="lbl">
      {f.label ? f.label : f.name }
      {factory(f)}
    </label>
  </div>
);

const mapReduceFields = (fields) => {
  fields.reduce(({ render, rem }, f) => (
    {
      render: [...render, fieldFactory(f, colSize(fields.size))],
      rem

    }), { render: [], rem: 11 });
};

const Filter = (props: Props) => (
  <div id="search-pnl" className="text-left">
    <div id="filter-row">
      <Form onSubmit={props.filter}>
        {formApi => (
          <form onSubmit={formApi.submitForm} className="row">
            {props.fields && mapReduceFields(fields)}
            {props.children}
            <div className="col-md-1 col-sm-1 text-right pull-right">
              <button id="filter-btn" className="btn" type="submit">GO</button>
            </div>
          </form>
        )}
      </Form>
    </div>
  </div>
);

Filter.defaultProps = {
  children: false
};

export default Filter;
