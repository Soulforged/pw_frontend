//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";
import { push } from "react-router-redux";
import UserDetails from "../UserDetails";

const mapStateToProps = ({ ui: { selected } }) => ({ selected });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openForm: id => dispatch(push(`/users/${id}`, { id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
