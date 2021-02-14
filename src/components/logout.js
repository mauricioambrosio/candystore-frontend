import { Component } from "react";
import { logout } from "../store/auth";
import { connect } from "react-redux";

class Logout extends Component {
  render() {
    this.props.logout();

    // window.location = "/";
    setTimeout(() => {
      window.location = "/";
    }, 1);

    return null;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
