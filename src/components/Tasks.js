import React, { Component } from "react";
import axios from "axios";
import Task from "./../components/Task";
import { TASK_GET_ALL } from "./../config/endpoints";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.task = false;
    this.ref = []; //React.createRef;

    // this.taskRef = React.createRef();
    this.tasksRef = React.createRef();

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
        response.data.forEach((element) => {
          this.ref.push({ _id: element._id, ref: React.createRef });
        });
        this.setState({ tasks: response.data });

        return response;
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  mouseDown = (event: any, _id): void => {
    this.task = _id;
    // event.stopPropagation();
    event.preventDefault();
    console.log(
      "movedown",
      event.pageY,
      this.ref.find((e) => e._id === _id).ref.getBoundingClientRect().top
    );
    console.log("ref", this.ref);
    console.log("this.taskRef", this.ref.find((e) => e._id === _id).taskRef);
    this.ref.find((e) => e._id === _id).taskRef.style.position = "absolute";
    this.ref.find((e) => e._id === _id).taskRef.style.top =
      event.pageY -
      this.tasksRef.current.getBoundingClientRect().top -
      113 +
      "px";

    const randomId = Math.random(0, 100000);
    console.log("tasks", this.state.tasks);
    const newTasks = [];
    this.state.tasks.forEach((task) => {
      newTasks.push(task);
      if (task._id === _id) {
        let newTask = { ...task };
        newTask._id = randomId;
        newTasks.push(newTask);
      }
    });
    this.ref.push({ _id: randomId });
    console.log("newTasks", newTasks);
    this.setState({ tasks: newTasks });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };

  mouseUp = (event: MouseEvent): void => {
    event.stopPropagation();
    this.task = false;

    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);

    const newTasks = this.state.tasks.filter((t) => {
      return typeof t._id === "string";
    });

    this.ref.forEach((e) => {
      if (e.taskRef) {
        console.log(
          "e.taskRef.getBoundingClientRect",
          e.taskRef.getBoundingClientRect().top
        );
        newTasks.find(
          (n) => n._id === e._id
        ).top = e.taskRef.getBoundingClientRect().top;

        e.taskRef.style.position = "";
        e.taskRef.style.top = "";
      }
    });
    newTasks.sort((a, b) => (a.top > b.top ? 1 : -1));
    console.log(">> newTasks", newTasks);
    this.setState({ tasks: newTasks });
  };

  mouseMove = (event: MouseEvent): void => {
    const _id = this.task;
    console.log("mousemove", event.pageY, event.clientY, this.task);
    this.ref.find((e) => e._id === _id).taskRef.style.top =
      event.pageY -
      this.tasksRef.current.getBoundingClientRect().top -
      113 +
      "px";
  };

  render() {
    console.log("render", this.task);
    return (
      <div ref={this.tasksRef}>
        {this.state.tasks.map((t) => {
          console.log("t._id", t._id);
          if (t._id < 1) {
            return (
              <div
                style={{
                  height: 113,
                  width: 200,
                  margin: 10,
                  backgroundColor: "grey",
                }}
              >
                {" "}
              </div>
            );
          } else {
            return (
              <div
                key={t._id}
                ref={(ref) =>
                  (this.ref.find((e) => e._id === t._id).taskRef = ref)
                }
              >
                <Task
                  moved={t._id === this.task}
                  refe={(ref) => {
                    this.ref.find((e) => e._id === t._id).ref = ref;
                  }}
                  taskInfo={t}
                  userSettings={this.props.userSettings}
                  getAllTasks={this.getAllTasks}
                  onMouseDown={this.mouseDown}
                  onMouseUp={this.mouseUp}
                />
              </div>
            );
          }
        })}
        {this.state.tasks.length === 0 && !this.task && (
          <div style={{ padding: 20, float: "left" }}>
            You have no tasks yet.
          </div>
        )}
        {/* <button
            onClick={() => this.props.changeAction("addNewTask")}
            style={{
              margin: "10px 20px 10px 30px",
              padding: "10px 20px 10px 20px",
            }}
          >
            Add +
          </button> */}
      </div>
    );
  }
}
