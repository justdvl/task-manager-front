import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import { withStackContext } from "./utils/StackProvider";
import Tasks from "./components/Tasks.js";
import Notification from "./components/Notification";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      word: "",
      translation: "",
      allPairs: [],
    };
  }

  render() {
    return (
      <div className="App" style={{ position: "relative" }}>
        <Tasks
          userSettings={this.props.userSettings}
          action={this.props.action}
        />

        <Notification stack={this.props.value.value} />
      </div>
    );
  }
}

export default withRouter(withStackContext(App));
