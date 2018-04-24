//@flow
import React from "react";
import { images } from "src/resources";

const Loading = ({ loading = true, style }: { loading: boolean, style?: Object }) => (
  loading ?
    <div id="loader" style={style}>
      <img src={images.loader} className="loader" alt="loading something..." />
    </div>
    : false
);

Loading.defaultProps = {
  style: {}
};

export default Loading;
