//@flow
import * as React from "react";
import { Form } from "react-form";
import { branch, compose, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

type Props = {
  item: Object,
  save: (Object) => void,
  saving: boolean,
  entityName: string,
  onClose: () => void,
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
  children: false
};

const SpecLoading = () => <Loading loading />;
const NoData = () => <div id="main-pnl" className="pnls">Not found</div>;

export default compose(
  boundLifecycle({
    didMount: ({ id, loader, item }) => !item && loader(id)
  }),
  branch(({ fetching }) => fetching, renderComponent(SpecLoading)),
  branch(({ item }) => item == null, renderComponent(NoData))
)(Component);
