//@flow
import * as React from "react";
import S from "string";
import { decamelize } from "humps";
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
  filter: (Object) => void,
  defaultFilter?: Object
};

const fieldMap = (type) => {
  switch (type) {
  case "select": return Select;
  default: return Text;
  }
};

const createComponent = ({ type, component }) => (
  component || fieldMap(type)
);

const ifOptions = options => (options ? { options } : {});

const factory = (field) => {
  const Component = createComponent(field);
  return (
    <Component
      id={field.name}
      field={field.name}
      className="form-control"
      {...ifOptions(field.options)}
      required={true && field.required !== false}
    />
  );
};

const colSize = (index, rest, length) => (
  index < length - 1 ? Math.round(11 / Math.max(length, 1)) : rest
);

const createLabel = (name, label) => (
  label || S(decamelize(name, { separator: " " })).capitalize().s
);

const fieldFactory = (f, size) => (
  <div className={`col-md-${size}`} key={f.name}>
    <label htmlFor={f.name} className="lbl">
      {createLabel(f.name, f.label)}
      {factory(f)}
    </label>
  </div>
);

const mapReduceFields = (fields, formApi) => {
  const red = fields.reduce(({ render, rem, visibleLength }, f, index) => {
    const shouldShow = f.condition ? f.condition(formApi) : true;
    if (shouldShow) {
      const nextColSize = colSize(index, rem, visibleLength);
      return {
        render: [...render, fieldFactory(f, nextColSize, formApi)],
        rem: (rem - nextColSize),
        visibleLength: visibleLength - 1
      };
    }
    return {
      render, rem, visibleLength: visibleLength - 1
    };
  }, { render: [], rem: 11, visibleLength: fields.length });
  return red.render;
};

const Filter = (props: Props) => (
  <div id="search-pnl" className="text-left">
    <div id="filter-row">
      <Form onSubmit={props.filter} defaultValues={props.defaultFilter}>
        {formApi => (
          <form onSubmit={formApi.submitForm} className="row">
            {props.fields && mapReduceFields(props.fields, formApi)}
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
  children: false,
  defaultFilter: {}
};

export default Filter;
