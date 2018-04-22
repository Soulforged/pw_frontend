//@flow
type State = "entering" | "entered" | "exiting" | "exited";

export const topDownSlide = (
  state: State,
  endValue: number,
  initialValue: number = 0,
  duration: number = 150
) => {
  const transitions = {
    entering: { height: initialValue, display: "block", opacity: 0 },
    entered: { height: endValue, display: "block", opacity: 1 },
    exiting: { height: endValue, display: "block", opacity: 1 },
    exited: { height: initialValue, display: "none", opacity: 0 },
  };
  return {
    transition: `height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    height: initialValue,
    display: "none",
    opacity: 0,
    ...transitions[state]
  };
};

export const collapse = (
  state: State,
  endValue: any,
  initialValue: any = "0px",
  duration: number = 150
) => {
  const transitions = {
    entering: { width: initialValue },
    entered: { width: endValue },
  };
  return {
    transition: `width ${duration}ms ease-in-out`,
    width: initialValue,
    overflow: "hidden",
    ...transitions[state]
  };
};

export const fadeIn = (state: State, duration: number = 150) => {
  const transitions = {
    entering: { opacity: 0, display: "block" },
    entered: { opacity: 1, display: "block" },
  };
  return {
    transition: `opacity ${duration}ms ease-in-out`,
    display: "none",
    opacity: 0,
    ...transitions[state]
  };
};
