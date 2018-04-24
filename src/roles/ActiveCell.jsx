//@flow
import React from "react";

type status = 1 | 0;

export default ({ value }: { value: status }) => (
  <span className={value ? "td-success" : "td-error"}>
    <i className="fa fa-circle" />{value ? "Active" : "Inactive"}
  </span>
);
