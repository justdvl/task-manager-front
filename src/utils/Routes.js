import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import authenticateUser from "./AuthenticateUser";
import Header from "../components/Header";
import App from "../App";
import LoginForm from "../components/LoginForm.js";
import SignUpForm from "../components/SignUpForm.js";
import Authenticate from "../components/common/Authenticate";
const REACT_APP_SUBDIRECTORY = process.env.REACT_APP_SUBDIRECTORY;

//classic route plus logout functionality
function CustomRoute({ path, component, doLogout }) {
  return (
    <Route
      path={path}
      render={(props) => {
        return (
          <Header
            doLogout={doLogout}
            Component={component}
            properties={props}
          />
        );
      }}
    />
  );
}

class Routes extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedWithCookies: "?",
    };
  }

  componentDidMount() {
    this.authenticate();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (this.state.isLoggedWithCookies && )
  // }

  async authenticate() {
    let user = null;
    try {
      user = await authenticateUser();
      this.setState({ isLoggedWithCookies: user });
    } catch (err) {
      console.error(err);
    }
  }

  loginSuccess = () => {
    setTimeout(() => {
      this.props.history.push(REACT_APP_SUBDIRECTORY);
    }, 500);
    setTimeout(() => {
      this.authenticate();
    }, 250);
  };

  doLogout = () => {
    this.setState({ isLoggedWithCookies: false });
  };

  changeRoute = (route) => {
    console.log("route", route);
    if (route === "signup") {
      this.setState({
        isLoggedWithCookies: "s",
      });
    }

    if (route === "login") {
      this.setState({
        isLoggedWithCookies: false,
      });
    }
  };

  render() {
    if (this.state.isLoggedWithCookies === "?") {
      return (
        <div style={{ margin: 20 }} className={"inputOpacity-password"}>
          Authentication in progress...
          <Authenticate />
        </div>
      );
    }

    if (this.state.isLoggedWithCookies === "s") {
      console.log("s");
      return (
        <SignUpForm
          loginSuccess={this.loginSuccess}
          changeRoute={this.changeRoute}
        />
      );
    }

    if (this.state.isLoggedWithCookies === false) {
      return (
        <LoginForm
          loginSuccess={this.loginSuccess}
          comingFrom={this.props.history.location.pathname}
          changeRoute={this.changeRoute}
        />
      );
    } else {
      return (
        <Switch>
          {/* <CustomRoute
            path={"/settings"}
            component={Settings}
            doLogout={this.doLogout}
          /> */}
          <CustomRoute path={"/"} component={App} doLogout={this.doLogout} />
        </Switch>
      );
    }
  }
}

export default withRouter(Routes);
