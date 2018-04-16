//@flow
import { Dashboard } from "src/dashboard";
import { Users } from "src/users";

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
  }
];
