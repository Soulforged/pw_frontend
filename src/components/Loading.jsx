//@flow
import React from "react";
import { images } from "src/resources";

export default ({ loading = true, style }: { loading: boolean, style?: Object }) => (
  loading ?
    <div id="loader" style={style}>
      <img src={images.loader} className="loader" alt="loading something..." />
    </div>
    : false
);
