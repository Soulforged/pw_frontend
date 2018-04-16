//@flow
import React from "react";
import { boundLifecycle } from "recompose-ext";

const Row = ({ user }: { user: Object }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.userName}</td>
    <td>{user.mobileNumber}</td>
    <td>{user.primaryEmail}</td>
    <td>{user.businessUnitName}</td>
    <td>{user.roleName}</td>
    <td className="td-success"><i className="fa fa-circle" />Active</td>
    <td><span className="edit fa fa-pencil theme" title="Edit" /></td>
    <td><span className="assign fa fa-tasks" title="Assign Role" /></td>
  </tr>
);

const Component = users => (
  users.items ? users.items.map(user => <Row key={user.id} user={user} />) : false
);

export default boundLifecycle({
  didMount: ({ fetchUsers }) => fetchUsers()
})(Component);
