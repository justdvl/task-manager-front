import React, { Component } from "react";
import axios from "axios";
import Task from "./../components/Task";

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Task />
        <Task />
      </div>
    );
  }
}
