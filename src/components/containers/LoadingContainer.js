//@flow
import { connect } from "react-redux";

import Loading from "../Loading";

const mapStateToProps = ({ loading }) => ({ loading });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
