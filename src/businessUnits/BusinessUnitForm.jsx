//@flow
import React from "react";
import { CRUDForm } from "src/components";

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

type Props = {
  item: Object,
  saving: boolean,
  edition: boolean,
  closeForm: () => void
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

const companyTypes = [
  { value: "Merchant" },
  { value: "Institution" }
];

const fields = () => [
  { name: "name", placeholder: "Business Unit Name" },
  {
    name: "companyType",
    label: "Company type",
    type: "radio",
    options: companyTypes,
    condition: ({ props }) => !props.item.id
  },
  {
    name: "status",
    type: "select",
    options: statusOptions,
    condition: ({ props }) => props.item.id
  },
  {
    name: "companyId",
    label: "Merchant",
    type: "select",
    options: merchantOptions,
    condition: ({ formApi }) => console.log(formApi.values) && !formApi.values.id && formApi.values.companyType === "Merchant"
  },
  {
    name: "companyId",
    label: "Institution",
    type: "select",
    options: institutionOption,
    condition: ({ formApi }) => !formApi.values.id && formApi.values.companyType === "Institution"
  }
];

const additinionalValues = values => ({ ...values, status: !values.id ? 1 : 0 });

const isCompanyIdError = ({ id, companyId }) => !id && !companyId;

const validate = values => (
  {
    companyId: {
      error: isCompanyIdError(values) && "You've to choose a company"
    }
  }
);

export default (props: Props) => (
  <CRUDForm
    {...props}
    item={{ ...props.item, companyType: props.item.institutionId ? "Institution" : "Merchant" }}
    fields={fields}
    preValidate={additinionalValues}
    validate={validate}
  />
);
