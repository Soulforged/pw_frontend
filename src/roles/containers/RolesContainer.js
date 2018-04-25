//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";

import Roles from "../Roles";

const mapStateToProps = ({ ui: { editionItem } }) => ({ editionItem });

const openForm = () => push("/new/roles");

const mapDispatchToProps = { openForm };

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
