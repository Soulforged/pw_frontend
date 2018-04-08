//@flow

import { connect } from "react-redux";
import actions from "src/actions";
import type { Dispatch } from "src/types";

import NavigationMenu from "../NavigationMenu";

const { logout, toggleTheme } = actions;

const mapStateToProps = ({ session: { user, routes }, ui: { light } }) => ({ user, routes, light });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout()),
  toggleTheme: () => dispatch(toggleTheme())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
