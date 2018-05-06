//@flow
import * as React from "react";
import { Form, Select, Text, RadioGroup, Radio } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

type Props = {
  item: Object,
  save: (Object) => void,
  saving: boolean,
  entityName: string,
  close: () => void,
  fields?: Array<Object>,
  children?: React.Node,
  preValidate?: (Object) => Object,
  validate?: (Object) => Object,
  preSubmit?: (Object) => Object
};

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

type FormApiProps = {
  errors: Object,
  touched: Object,
  submitted: boolean
};

const ErrorMessages = ({ errors, touched, submitted }: FormApiProps) => (
  <div>
    {errors
      && Object.keys(errors).map(k => (touched[k] || submitted)
      && <div key={k}>{errors[k]}</div>)}
  </div>
);

const fieldMap = (type) => {
  switch (type) {
  case "select": return Select;
  case "radio": return RadioGroup;
  default: return Text;
  }
};

const createComponent = ({ type, component }) => (
  component || fieldMap(type)
);

const createLabel = (name, label) => (
  label || name.humanize().capitalize()
);

const mapRadioOpts = opts => (
  opts.map(opt => (
    <div key={opt.value}>
      <Radio id={opt.label || opt.value} value={opt.value} />
      <label htmlFor={opt.label || opt.value}>{opt.label || opt.value}</label>
    </div>
  ))
);

const ifOptions = opts => (opts ? { options: opts } : {});

const factory = (field) => {
  const Component = createComponent(field);
  // const computedProps = {
  //   id: field.name,
  //   ...ifOptions(field.options),
  //   field: field.name,
  //   type: field.type,
  //   className: "form-control",
  //   placeholder: createLabel(field.name, field.placeholder),
  //   required: (true && field.required !== false)
  // };
  if (field.type === "radio") {
    return (
      <Component
        id={field.name}
        field={field.name}
        className="form-control"
        placeholder={createLabel(field.name, field.placeholder)}
        {...ifOptions(field.options)}
        required={true && field.required !== false}
      >
        {mapRadioOpts(field.options)}
      </Component>
    );
  }
  return (
    <Component
      id={field.name}
      field={field.name}
      className="form-control"
      placeholder={createLabel(field.name, field.placeholder)}
      {...ifOptions(field.options)}
      required={true && field.required !== false}
    />
  );
};

const fieldFactory = (f, formApi, props) => {
  const shouldShow = f.condition ? f.condition({ formApi, props }) : true;
  if (shouldShow) {
    return (
      <div className="row modal-p" key={f.name}>
        <div className="col-md-6 col-sm-6">
          <label htmlFor={f.name}>{createLabel(f.name, f.label)}</label>
        </div>
        <div className="col-md-6 col-sm-6">
          {factory(f)}
        </div>
      </div>
    );
  }
  return false;
};

const mapFields = (props, formApi) => props.fields(props).map(f => fieldFactory(f, formApi, props));

const Component = (props: Props) => (
  <div id="main-pnl" className="pnls">
    <h4 className="form-header trebuchet text-center bold">
      {props.item.id ? `Edit ${props.entityName} ${props.item.id}` : `New ${props.entityName}`}
      <button className="add-new pointer pull-right bold" onClick={props.close}>
        <i className="fa fa-close theme" />
      </button>
    </h4>
    <div className="add-pnl-cnt">
      <Form
        onSubmit={props.save}
        defaultValues={props.item}
        preValidate={props.preValidate}
        validate={props.validate}
        preSubmit={props.preSubmit}
      >
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            {props.fields && mapFields(props, formApi)}
            {props.children}
            <hr />
            <ErrorMessages
              errors={formApi.errors}
              touched={formApi.touched}
              submitted={formApi.submitted}
            />
            <article className="modal-p text-center">
              <ButtonOrLoading saving={props.saving} />
            </article>
          </form>
        )}
      </Form>
    </div>
  </div>
);

Component.defaultProps = {
  preValidate: values => values,
  preSubmit: values => values,
  validate: () => ({}),
  children: false,
  fields: []
};

const SpecLoading = () => <Loading loading />;
const NoData = () => <div id="main-pnl" className="pnls">Not found</div>;

export default compose(
  boundLifecycle({
    didMount: ({ id, loader }) => loader(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
