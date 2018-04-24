//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import type { Dispatch } from "src/types";
import { fetchRoles } from "../actions";
import RolesList from "../rolesList";

const mapStateToProps = ({ entities: { roles } }) => ({ roles });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openForm: id => dispatch(push(`/edit/roles/${id}`)),
  fetchRoles: () => dispatch(fetchRoles()),
  showDetails: id => dispatch(push(`/roles/${id}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
