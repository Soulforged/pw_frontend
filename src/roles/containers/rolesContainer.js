//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";
import { push } from "react-router-redux";

import Roles from "../roles";

const mapStateToProps = ({ ui: { editionItem } }) => ({ editionItem });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openForm: () => dispatch(push("/new/roles"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
