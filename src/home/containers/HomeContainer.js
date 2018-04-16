//@flow
import { connect } from "react-redux";

import Home from "../Home";

const mapStateToProps = ({ ui: { menuCollapsed } }) => ({ menuCollapsed });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
