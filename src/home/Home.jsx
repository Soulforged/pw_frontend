//@flow
import React from "react";
import { NavigationMenu } from "src/menu";
import MainNavigation from "src/MainNavigation";
import Transition from "react-transition-group/Transition";
import { shirnkTransition } from "src/animations";

const duration = 150;

export default ({ menuCollapsed }: { menuCollapsed: boolean }) => (
  <Transition in={!menuCollapsed} timeout={duration}>
    {state => (
      <div id="wrapper">
        <div
          id="wrapper_left"
          className="text-center"
          style={shirnkTransition({
            duration,
            key: "width",
            initialValue: "4%",
            endValue: "14%",
            state
          })}
        >
          <NavigationMenu />
        </div>
        <div
          id="wrapper_right"
          style={shirnkTransition({
            duration,
            key: "width",
            initialValue: "96%",
            endValue: "86%",
            state
          })}
        >
          <MainNavigation />
        </div>
      </div>
    )}
  </Transition>
);
