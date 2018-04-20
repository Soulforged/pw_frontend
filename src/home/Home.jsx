//@flow
import React from "react";
import { NavigationMenu } from "src/menu";
import MainNavigation from "src/MainNavigation";
import Transition from "react-transition-group/Transition";
import { shirnkTransition } from "src/animations";

const defDuration = 150;

export default ({ menuCollapsed }: { menuCollapsed: boolean }) => (
  <Transition in={!menuCollapsed} timeout={defDuration}>
    {state => (
      <div id="wrapper">
        <div id="wrapper_left" className="text-center" style={shirnkTransition(defDuration, "width", "4%", "14%", state)}>
          <NavigationMenu />
        </div>
        <div id="wrapper_right" style={shirnkTransition(defDuration, "width", "96%", "86%", state)}>
          <MainNavigation />
        </div>
      </div>
    )}
  </Transition>
);
