//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import { fetchUserByCriteria } from "../actions";

import Users from "../Users";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserByCriteria: params => dispatch(fetchUserByCriteria(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
