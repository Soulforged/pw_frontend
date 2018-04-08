//@flow
import { connect } from "react-redux";
import type { Session } from "src/types";

import Home from "../Home";

const mapStateToProps = ({ session }: Session) => ({ session });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
