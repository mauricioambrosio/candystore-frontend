import { Component } from "react";
import { logout } from "../store/auth";
import { connect } from "react-redux";

// this route calls the redux logout action for dispatch 
class Logout extends Component {
  render() {
    this.props.logout();


    setTimeout(() => {
      window.location = "/";
    }, 1);

    return null;
  }
}

const mapStateToProps = (state) => ({});

// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
