//@flow
import React from "react";
import { NavigationMenu } from "src/menu";
import MainNavigation from "src/MainNavigation";

export default ({ menuCollapsed }: { menuCollapsed: boolean }) => (
  <div id="wrapper">
    <div id="wrapper_left" className="text-center animate" style={{ width: menuCollapsed ? "4%" : "14%", overflow: "hidden" }}>
      <NavigationMenu />
    </div>
    <div id="wrapper_right" style={{ width: menuCollapsed ? "96%" : "86%", overflow: "hidden" }} className="animate">
      <MainNavigation />
    </div>
  </div>
);
