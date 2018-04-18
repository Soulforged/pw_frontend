//@flow
import React from "react";
import { images } from "src/resources";

export default ({ style }: { style: Object }) => (
  <div id="loader" style={style}>
    <img src={images.loader} className="loader" alt="loading something..." />
  </div>
);
