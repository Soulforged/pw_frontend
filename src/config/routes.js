//@flow
import { Dashboard } from "src/dashboard";
import { Users, UserForm } from "src/users";

export default [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: Dashboard,
    hidden: true
  },
  {
    path: "/dashboard",
    name: "dashboard",
    title: "Dashboard",
    component: Dashboard
  },
  {
    path: "/users",
    name: "users",
    title: "Users",
    component: Users
  },
  {
    path: "/users/:id/edit",
    name: "users_edit",
    title: "User edition",
    component: UserForm,
    hidden: true
  },
  {
    path: "/users/:id/new",
    name: "users_create",
    title: "New user",
    component: UserForm,
    hidden: true
  }
];
