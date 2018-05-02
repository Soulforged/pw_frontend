//@flow
import React from "react";
import { Text, Select, RadioGroup, Radio } from "react-form";
import { CRUDForm } from "src/components";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

type Props = {
  item: Object,
  saveBusinessUnit: (Object) => void,
  saving: boolean,
  edition: boolean,
  closeForm: () => void,
  getBusinessUnit: (number) => void
};

const institutionOption = [
  { value: 2, label: "MPESA" },
  { value: 3, label: "PAMBAZUKA" },
  { value: 4, label: "AIRTEL" },
  { value: 201887, label: "FNB" },
  { value: 201888, label: "Institution X" },
  { value: 201900, label: "FrtNB" },
  { value: 202121, label: "REW" }
];

const merchantOptions = [
  { value: 1, label: "SPORTPESA" },
  { value: 102, label: "Me2rchant Name" },
  { value: 200, label: "80Merchant Name" },
  { value: 201, label: "81Merchant Name" },
  { value: 105, label: "4Merchant Name" },
  { value: 114, label: "13Merchant Name" },
  { value: 5609, label: "r8Merchant Name" }
];

const additinionalValues = values => ({ ...values, status: 1, companyId: 1 });

const validate = values => (
  {
    institutionId: {
      error: values.companyType === "Institution" && !values.institutionId && "Institution is required"
    },
    merchantId: {
      error: values.companyType === "Merchant" && !values.merchantId && "Merchant is required"
    }
  }
);

const StatusSelect = ({ item }: Item) => (
  <article className="row modal-p hidden">
    <div className="col-md-6 col-sm-6">
      <label htmlFor="status">Status</label>
    </div>
    <div className="col-md-6 col-sm-6">
      <Select
        id="status"
        className="form-control"
        field="status"
        options={statusOptions}
        value={item.status}
      />
    </div>
  </article>
);

const CompanyTypeSelect = () => (
  <article className="row modal-p">
    <div className="col-md-6 col-sm-6"><label>Company Type</label></div>
    <div className="col-md-6 col-sm-6 radios">
      <RadioGroup field="companyType">
        <Radio id="merchantRadio" value="Merchant" />
        <label htmlFor="merchantRadio">Merchant</label>
        <Radio id="instRadio" value="Institution" />
        <label htmlFor="instRadio">Institution</label>
      </RadioGroup>
    </div>
  </article>
);

const MerchantSelect = () => (
  <article id="merchant-div" className="row modal-p">
    <div className="col-md-6 col-sm-6"><label>Merchant</label></div>
    <div className="col-md-6 col-sm-6">
      <Select
        id="merchant"
        className="form-control"
        field="merchantId"
        options={merchantOptions}
      />
    </div>
  </article>
);

const InstitutionSelect = () => (
  <article id="instut-div" className="row modal-p hidden">
    <div className="col-md-6 col-sm-6"><label>Institution</label></div>
    <div className="col-md-6 col-sm-6">
      <Select
        id="instut"
        className="form-control"
        field="institutionId"
        options={institutionOption}
      />
    </div>
  </article>
);

const ContentComponent = (props: { formApi: Object, item: Object }) => (
  <div>
    <article className="row modal-p">
      <div className="col-md-6 col-sm-6">
        <label htmlFor="name">Name:</label>
      </div>
      <div className="col-md-6 col-sm-6">
        <Text
          id="name"
          className="form-control"
          field="name"
          required
          placeholder="Business Unit Name"
        />
      </div>
    </article>
    {props.item.id && <StatusSelect item={props.item} />}
    {!props.item.id && <CompanyTypeSelect item={props.item} />}
    {!props.item.id && props.formApi.values.companyType === "Merchant" && <MerchantSelect item={props.item} />}
    {!props.item.id && props.formApi.values.companyType === "Institution" && <InstitutionSelect item={props.item} />}
  </div>
);

export default (props: Props) => (
  <CRUDForm
    {...props}
    save={props.saveBusinessUnit}
    entityName="business_unit"
    onClose={props.closeForm}
    loader={props.getBusinessUnit}
    preValidate={additinionalValues}
    validate={validate}
    component={ContentComponent}
  />
);
