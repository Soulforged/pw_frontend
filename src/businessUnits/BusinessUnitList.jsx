//@flow
import React from "react";
import ReactTable from "react-table";
import { compose, branch, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const ActiveCell = row => (
  <span className={row.value ? "td-success" : "td-error"}>
    <i className="fa fa-circle" />{row.value ? "Active" : "Inactive"}
  </span>
);

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Company Type", accessor: "companyType" },
  { Header: "Status", accessor: "status", Cell: ActiveCell },
];

const data = businessUnits => (
  !businessUnits.error && businessUnits.lastResultIds ?
    businessUnits.lastResultIds.map(id => businessUnits.byId[id])
    : []
);

type Props = {
  businessUnits: Object,
  showDetails: (id: number) => void
}
const Component = ({ businessUnits, showDetails }: Props) => (
  <ReactTable
    data={data(businessUnits)}
    columns={columns}
    className="-striped -highlight tbl-wrapper table table-striped"
    noDataText={(businessUnits.error && businessUnits.error.expected && businessUnits.error.message) || "No data to show"}
    defaultPageSize={10}
    getTrProps={(state, rowInfo) => (
      {
        onClick: () => showDetails(rowInfo.original.id)
      }
    )}
  />
);

const SpecLoading = () => <Loading loading />;

export default compose(
  boundLifecycle({
    didMount: ({ fetchBusinessUnits }) => fetchBusinessUnits()
  }),
  branch(({ businessUnits }) => businessUnits.fetching, renderComponent(SpecLoading))
)(Component);
