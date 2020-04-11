import React, { Component } from "react";
import axios from "axios";
import Task from "./../components/Task";
import { TASK_GET_ALL } from "./../config/endpoints";

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [] };
  }

  componentDidMount() {
    this.getAllTasks();

    console.log("sent");
  }

  componentDidUpdate(prevProps) {
    if (this.props.action === "" && prevProps.action !== "") {
      this.getAllTasks();
    }
  }

  getAllTasks = async () => {
    const URL = TASK_GET_ALL;
    const username = this.props.userSettings.username;

    const response = await axios
      .post(
        URL,
        {
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({ tasks: response.data });
        return response;
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  render() {
    return (
      <div>
        {this.state.tasks.map((t) => {
          return (
            <Task
              key={t._id}
              taskInfo={t}
              userSettings={this.props.userSettings}
            />
          );
        })}
        {this.state.tasks.length === 0 && (
          <div style={{ padding: 20, float: "left" }}>
            You have no tasks yet.
          </div>
        )}
      </div>
    );
  }
}
