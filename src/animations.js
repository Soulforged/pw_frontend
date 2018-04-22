//@flow
type CommonProps = {
  duration: integer,
  state: boolean
};

type SlideShrinkProps = {
  key: string,
  initialValue: any,
  endValue: any,
  ...CommonProps
};

export const slideTransition = ({
  duration, key, initialValue, endValue, state
}: SlideShrinkProps) => {
  const transitions = {
    entering: { [key]: initialValue, display: "block", opacity: 0 },
    entered: { [key]: endValue, display: "block", opacity: 1 },
    exiting: { [key]: endValue, display: "block", opacity: 1 },
    exited: { [key]: initialValue, display: "none", opacity: 0 },
  };
  return {
    transition: `${key} ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    [key]: initialValue,
    display: "none",
    opacity: 0,
    ...transitions[state]
  };
};

export const shirnkTransition = ({
  duration, key, initialValue, endValue, state
}: SlideShrinkProps) => {
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

export const fadeInTransition = ({ duration, state }: CommonProps) => {
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
