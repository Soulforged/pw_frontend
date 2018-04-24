//@flow

import { connect } from "react-redux";
import actions from "src/actions";

import NavigationMenu from "../NavigationMenu";

const {
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu
} = actions;

const mapStateToProps = ({
  session: { user: { details: { userName } }, routes },
  ui: { dark, menuCollapsed, userMenuCollapsed }
}) => ({
  userName,
  routes,
  dark,
  menuCollapsed,
  userMenuCollapsed
});

const mapDispatchToProps = {
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
