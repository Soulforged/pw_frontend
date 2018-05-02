//@flow
import * as React from "react";
import { decamelize } from "humps";
import S from "string";
import { Form, Select, Text } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

type Props = {
  item: Object,
  save: (Object) => void,
  saving: boolean,
  entityName: string,
  onClose: () => void,
  fields?: Array<Object>,
  children?: React.Node,
  preValidate?: (Object) => Object,
  validate?: (Object) => Object
};

const ButtonOrLoading = ({ saving }: { saving: boolean }) => (
  saving ? <Loading loading /> : <button type="submit" className="btn btn-default">SAVE</button>
);

type FormApiProps = {
  errors: Object,
  touched: Object
};

const ErrorMessages = ({ errors, touched }: FormApiProps) => (
  <div>
    {errors && Object.keys(errors).map(k => touched[k] && <div key={k}>{errors[k]}</div>)}
  </div>
);

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

const createLabel = (name, label) => (
  label || S(decamelize(name, { separator: " " })).capitalize().s
);

const factory = (field) => {
  const Component = createComponent(field);
  return (
    <Component
      id={field.name}
      field={field.name}
      className="form-control"
      placeholder={createLabel(field.name, field.label)}
      {...ifOptions(field.options)}
      required={true && field.required !== false}
    />
  );
};

const fieldFactory = f => (
  <div className="row modal-p" key={f.name}>
    <div className="col-md-6 col-sm-6">
      <label htmlFor={f.name}>{createLabel(f.name, f.label)}</label>
    </div>
    <div className="col-md-6 col-sm-6">
      {factory(f)}
    </div>
  </div>
);

const Component = (props: Props) => (
  <div id="main-pnl" className="pnls">
    <h4 className="form-header trebuchet text-center bold">
      {props.item.id ? `Edit ${props.entityName} ${props.item.id}` : `New ${props.entityName}`}
      <button className="add-new pointer pull-right bold" onClick={props.onClose}>
        <i className="fa fa-close theme" />
      </button>
    </h4>
    <div className="add-pnl-cnt">
      <Form
        onSubmit={props.save}
        defaultValues={props.item}
        preValidate={props.preValidate}
        validate={props.validate}
      >
        {formApi => (
          <form id="user_frm" onSubmit={formApi.submitForm}>
            {props.fields && props.fields(props).map(fieldFactory)}
            {props.children}
            <hr />
            <ErrorMessages errors={formApi.errors} touched={formApi.touched} />
            <article className="row modal-p pull-right">
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
