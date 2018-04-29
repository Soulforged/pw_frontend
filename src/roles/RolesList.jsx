//@flow
import React from "react";
import ReactTable from "react-table";
import { compose, branch, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";
import ActiveCell from "src/roles/ActiveCell";

const columns = [
  { Header: "ID", accessor: "id", maxWidth: 50 },
  { Header: "Role Name", accessor: "name" },
  { Header: "Status", accessor: "status", Cell: row => <ActiveCell value={row.value} /> }
];

const data = roles => (
  !roles.error && roles.lastResultIds ?
    roles.lastResultIds.map(id => roles.byId[id])
    : []
);

type Props = {
  roles: Object,
  showDetails: (number) => void
};

const Component = ({ roles, showDetails }: Props) => (
  <ReactTable
    data={data(roles)}
    columns={columns}
    className="-striped -highlight table table-striped"
    noDataText={(roles.error && roles.error.expected && roles.error.message) || "No data to show"}
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
    didMount: ({ fetchRoles }) => fetchRoles()
  }),
  branch(({ roles }) => roles.fetching, renderComponent(SpecLoading))
)(Component);
