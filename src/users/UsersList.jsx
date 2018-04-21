//@flow
import React from "react";
import ReactTable from "react-table";
import { compose, branch, renderComponent } from "recompose";
import { boundLifecycle } from "recompose-ext";
import { Loading } from "src/components";

const ActiveCell = row => (
  <span className={row.value ? "td-success" : "td-error"}>
    <i className="fa fa-circle" />{row.value ? "Active" : "Inactive"}
  </span>
);

const columns = [
  { Header: "ID", accessor: "id", maxWidth: 50 },
  { Header: "First name", accessor: "firstName" },
  { Header: "Last name", accessor: "lastName" },
  { Header: "Username", accessor: "userName" },
  { Header: "Mobile number", accessor: "mobileNumber" },
  { Header: "Primary email", accessor: "primaryEmail" },
  { Header: "Business unit", accessor: "businessUnitName" },
  { Header: "Role", accessor: "roleName" },
  { Header: "Status", accessor: "status", Cell: ActiveCell },
];

const data = users => (
  !users.error && users.lastResultIds ?
    users.lastResultIds.map(id => users.byId[id])
    : []
);

type Props = {
  users: Object,
  showDetails: (id: integer) => void
}

const Component = ({ users, showDetails }: Props) => (
  <ReactTable
    data={data(users)}
    columns={columns}
    className="-striped -highlight tbl-wrapper table table-striped"
    noDataText={(users.error && users.error.expected && users.error.message) || "No data to show"}
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
    didMount: ({ fetchUsers }) => fetchUsers()
  }),
  branch(({ users }) => users.fetching, renderComponent(SpecLoading))
)(Component);
