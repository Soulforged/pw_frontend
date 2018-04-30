//@flow

import * as React from "react";
import type { AppError } from "src/types";
import { compose, withHandlers } from "recompose";
import { boundLifecycle } from "src/recompose-ext";

type ErrorState = Error | false;

type Props = {
  children: React.Node,
  error: ErrorState,
  resetError: () => void
};

const onCatch = (error: Error, info: string, { setError }: { setError: (AppError) => void }) => {
  console.log(error);
  setError(error);
};

const renderError = (error, resetError) => {
  if (error) {
    return (
      <div id="alertdiv2" className="text-center error">
        <span>{error.message}</span>
        <button title="Close" onClick={resetError} className="fa fa-close alert2-x" style={{ margin: 5 }} />
      </div>
    );
  }
  return false;
};

const Component = ({ error, resetError, children }: Props) => (
  <div>
    {children}
    {renderError(error, resetError)}
  </div>
);

export default compose(
  boundLifecycle({ onCatch }),
  withHandlers({
    resetError: ({ setError }) => () => setError(false)
  })
)(Component);
