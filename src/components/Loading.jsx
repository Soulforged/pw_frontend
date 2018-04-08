//@flow
import React from "react";

type Props = {
  loading: boolean
}

export default ({ loading }: Props) => (
  loading ?
    <div id="loader">
      <div className="loader" />
    </div>
    : false
);
