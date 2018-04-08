//@flow
import { Dashboard } from "src/dashboard";

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
  }
];
