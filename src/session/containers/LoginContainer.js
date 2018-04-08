//@flow
import { connect } from "react-redux";
import actions from "src/actions";

const { login } = actions;

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    login: form => dispatch(login(form))
  }
);

export default connect(mapStateToProps, mapDispatchToProps);
