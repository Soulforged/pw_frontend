//@flow

export const slideTransition = (duration, key, initialValue, endValue, state) => {
  const transitions = {
    entering: { [key]: initialValue, display: "block", opacity: 0 },
    entered: { [key]: endValue, display: "block", opacity: 1 },
  };
  return {
    transition: `opacity ${key} ${duration}ms ease-in-out`,
    [key]: initialValue,
    display: "none",
    opacity: 0,
    ...transitions[state]
  };
};

export const shirnkTransition = (duration, key, initialValue, endValue, state) => {
  const transitions = {
    entering: { [key]: initialValue },
    entered: { [key]: endValue },
  };
  return {
    transition: `${key} ${duration}ms ease-in-out`,
    [key]: initialValue,
    overflow: "hidden",
    ...transitions[state]
  };
};
