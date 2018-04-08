//@flow
import React from "react";
import { NavigationMenu } from "src/menu";
import MainNavigation from "src/MainNavigation";

export default () => (
  <div id="wrapper">
    <div id="wrapper_left" className="text-center">
      <NavigationMenu />
    </div>
    <div id="wrapper_right">
      <MainNavigation />
    </div>
  </div>
);
