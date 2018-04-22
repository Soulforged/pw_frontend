//@flow
import React from "react";
import { NavigationMenu } from "src/menu";
import MainNavigation from "src/MainNavigation";
import Transition from "react-transition-group/Transition";
import { collapse } from "src/animations";

const duration = 150;

export default ({ menuCollapsed }: { menuCollapsed: boolean }) => (
  <Transition in={!menuCollapsed} timeout={duration}>
    {state => (
      <div id="wrapper">
        <div id="wrapper_left" className="text-center" style={collapse(state, "14%", "4%")}>
          <NavigationMenu />
        </div>
        <div id="wrapper_right" style={collapse(state, "86%", "96%")}>
          <MainNavigation />
        </div>
      </div>
    )}
  </Transition>
);
