//@flow

import { connect } from "react-redux";
import actions from "src/actions";
import type { Dispatch } from "src/types";

import NavigationMenu from "../NavigationMenu";

const {
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu
} = actions;

const mapStateToProps = ({
  session: { user, routes },
  ui: { dark, menuCollapsed, userMenuCollapsed }
}) => ({
  user,
  routes,
  dark,
  menuCollapsed,
  userMenuCollapsed
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout()),
  toggleTheme: () => dispatch(toggleTheme()),
  toggleMenu: () => dispatch(toggleMenu()),
  toggleUserMenu: () => dispatch(toggleUserMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
