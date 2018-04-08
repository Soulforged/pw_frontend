//@flow

import * as React from "react";
import { boundLifecycle } from "src/recompose-ext";

type ErrorState = Error | false;

type Props = {
  children: React.Node,
  error: ErrorState,
  resetError: () => void
};

const onCatch = (error: Error, info: string, { setError }: Props) => {
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

const component = ({ error, resetError, children }: Props) => (
  <div>
    { { ...children } }
    {renderError(error, resetError)}
  </div>
);

export default boundLifecycle({ onCatch })(component);
