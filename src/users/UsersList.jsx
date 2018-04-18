//@flow
import React from "react";
import ReactTable from "react-table";
import { boundLifecycle } from "recompose-ext";
import { Loading } from "src/components";

const columns = [
  { Header: "ID", accesor: "id" },
  { Header: "First name", accessor: "firstName" },
  { Header: "Last name", accessor: "lastName" },
  { Header: "Username", accessor: "userName" },
  { Header: "Mobile number", accessor: "mobileNumber" },
  { Header: "Primary email", accessor: "primaryEmail" },
  { Header: "Business unit", accessor: "businessUnitName" },
  { Header: "Role", accessor: "role" },
  { Header: "Status", accessor: "status" },
  { Header: "" },
  { Header: "" }
];

const data = users => (
  !users.error && users.lastResultIds ?
    users.lastResultIds.map(username => users.byId[username])
    : []
);

const Component = (users) => {
  if (users.fetching) {
    return <Loading loading={users.fetching} />;
  }
  return (
    <ReactTable
      data={data(users)}
      columns={columns}
      className="-striped -highlight"
      noDataText={(users.error && users.error.message) || "No data to show"}
    />
  );
};

export default boundLifecycle({
  didMount: ({ fetchUsers }) => fetchUsers()
})(Component);
