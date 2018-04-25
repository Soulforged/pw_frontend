//@flow
import { Dashboard } from "src/dashboard";
import { Users, UserForm, UserDetails } from "src/users";
import { Roles, RoleForm, RoleDetails } from "src/roles";

export default [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: Dashboard,
    exact: true,
    hidden: true
  },
  {
    path: "/dashboard",
    name: "dashboard",
    title: "Dashboard",
    component: Dashboard,
    exact: true
  },
  {
    path: "/users",
    name: "users",
    title: "Users",
    component: Users,
  },
  {
    path: "/users/:id",
    name: "user",
    title: "User details",
    component: UserDetails,
    hidden: true,
    strict: true,
    exact: true
  },
  {
    path: "/edit/users/:id",
    name: "users_edit",
    title: "User edition",
    component: UserForm,
    hidden: true,
    exact: true,
    strict: true
  },
  {
    path: "/new/users",
    name: "users_create",
    title: "New user",
    component: UserForm,
    hidden: true,
    exact: true,
    strict: true
  },
  {
    path: "/roles",
    name: "roles",
    title: "roles",
    component: Roles,
  },
  {
    path: "/roles/:id",
    name: "role",
    title: "Role details",
    component: RoleDetails,
    hidden: true,
    strict: true,
    exact: true
  },
  {
    path: "/edit/roles/:id",
    name: "roles_edit",
    title: "Role edition",
    component: RoleForm,
    hidden: true,
    exact: true,
    strict: true
  },
  {
    path: "/new/roles",
    name: "roles_create",
    title: "New role",
    component: RoleForm,
    hidden: true,
    exact: true,
    strict: true
  }
];
