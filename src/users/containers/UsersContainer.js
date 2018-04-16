//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import { fetchUsers } from "../actions";

import Users from "../Users";

const mapStateToProps = ({ entities: { users } }) => users;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsers: params => dispatch(fetchUsers(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
