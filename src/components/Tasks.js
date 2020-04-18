import React, { Component } from "react";
import axios from "axios";
import Task from "./../components/Task";
import { TASK_GET_ALL, TASK_SORT } from "./../config/endpoints";
import _ from "lodash";

const DEFAULT_BG_COLOR = "#555";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.task = false;
    this.mouseMoved = false;
    this.mouseMoveChange = 0;
    this.scrollDirection = 0;
    this.width = 200;
    this.height = 100;
    this.newHeight = 0;
    this.yPositionOfHeadlineClick = 0;
    this.ref = []; //React.createRef;
    this.bgColor = DEFAULT_BG_COLOR;

    // this.taskRef = React.createRef();
    this.tasksRef = React.createRef();
    this.addNewTaskRef = React.createRef();

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

    await axios
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
        response.data.sort((a, b) =>
          parseInt(a.index) > parseInt(b.index) ? 1 : -1
        );
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
    this.mouseMoved = false;
    this.mouseMoveChange = event.pageY + window.scrollY;
    this.task = _id;
    this.bgColor = this.state.tasks.find((t) => t._id === _id).color;
    if (!this.bgColor) {
      this.bgColor = DEFAULT_BG_COLOR;
    }
    console.log("bgColor", this.bgColor);
    // event.stopPropagation();
    event.preventDefault();
    // console.log(
    //   "movedown",
    //   event.pageY,
    //   "scrollY",
    //   window.scrollY,
    //   this.ref.find((e) => e._id === _id).ref.getBoundingClientRect().top
    // );

    this.addNewTaskRef.current.style.position = "absolute";
    this.addNewTaskRef.current.style.top =
      this.addNewTaskRef.current.getBoundingClientRect().top +
      window.scrollY -
      40 +
      "px";
    // console.log(
    //   "from top",
    //   this.addNewTaskRef.current.getBoundingClientRect().top,
    //   window.scrollY
    // );

    this.yPositionOfHeadlineClick =
      this.ref.find((e) => e._id === _id).ref.getBoundingClientRect().top -
      event.pageY +
      window.scrollY;

    console.log(
      "this.yPositionOfHeadlineClick",
      this.yPositionOfHeadlineClick,
      "window.scrollY,",
      window.scrollY
    );

    this.width = this.ref
      .find((e) => e._id === _id)
      .ref.getBoundingClientRect().width;
    this.height = this.ref
      .find((e) => e._id === _id)
      .taskRef.getBoundingClientRect().height;

    // console.log("ref", this.ref);
    // console.log("this.taskRef", this.ref.find((e) => e._id === _id).taskRef);

    // this.ref.find((e) => e._id === _id).taskRef.style.top =
    //   event.pageY -
    //   this.tasksRef.current.getBoundingClientRect().top -
    //   113 +
    //   "px";

    const newHeight =
      -window.scrollY +
      event.pageY -
      this.tasksRef.current.getBoundingClientRect().top +
      this.yPositionOfHeadlineClick;

    this.ref.find((e) => e._id === _id).taskRef.style.top =
      newHeight - 10 + "px";

    // console.log(
    //   "setting newTop",
    //   newHeight,
    //   "this.yPositionOfHeadlineClick;",
    //   this.yPositionOfHeadlineClick
    // );

    const randomId = Math.random(0, 100000);
    this.randomId = randomId;

    console.log("tasks", this.state.tasks);
    const newTasks = [];
    this.state.tasks.forEach((task, i) => {
      const topPosition =
        //-window.scrollY +
        this.ref
          .find((ref) => ref._id === task._id)
          .taskRef.getBoundingClientRect().top -
        this.yPositionOfHeadlineClick -
        this.tasksRef.current.getBoundingClientRect().top;
      newTasks.push({ ...task, top: topPosition });
      if (task._id === _id) {
        let newTask = { ...task, top: topPosition };
        newTask._id = randomId;
        newTasks.push(newTask);
      }
    });
    this.ref.push({ _id: randomId });
    console.log("...newTasks", newTasks);

    this.movingTask = this.ref.find((e) => e._id === _id).taskRef;
    this.movingTask.style.position = "absolute";
    this.movingTask.style.left = "5px";
    this.movingTask.style.zIndex = "30";

    this.setState({ tasks: newTasks });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };

  mouseUp = (event: MouseEvent): void => {
    event.stopPropagation();

    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);

    //removing grey under task, sorting them
    const newTasks = _.cloneDeep(this.state.tasks).filter((t) => {
      return typeof t._id === "string";
    });

    this.ref.forEach((e) => {
      if (typeof e._id === "string" && e.taskRef) {
        //     console.log(
        //       "e.taskRef.getBoundingClientRect",
        //       e.taskRef.getBoundingClientRect().top
        //     );

        //     let halfWay = 0;
        //     // if (this.task === e._id) {
        //     //   halfWay = 100;
        //     // }

        //     newTasks.find((n) => n._id === e._id).top =
        //       e.taskRef.getBoundingClientRect().top + halfWay;

        e.taskRef.style.position = "";
        // e.taskRef.style.top = "";

        //     try {
        //       this.movingTask.style.zIndex = "0";
        //       this.task = false;
        //     } catch (e) {
        //       console.error(e);
        //     }
      }
    });
    if (this.mouseMoved) {
      newTasks.find((n) => n._id === this.task).top =
        this.newHeight + this.scrollDirection * 65;

      newTasks.sort((a, b) => (a.top > b.top ? 1 : -1));
    }
    console.log(">> newTasks", newTasks);
    this.setState({ tasks: newTasks }, () => {
      this.saveTasksOrder(newTasks);
    });

    this.addNewTaskRef.current.style.top = "";
    this.addNewTaskRef.current.style.position = "";
  };

  mouseMove = (event: MouseEvent): void => {
    this.mouseMoved = true;
    if (event.pageY + window.scrollY - this.mouseMoveChange > 0) {
      this.scrollDirection = 1;
    }
    if (event.pageY + window.scrollY - this.mouseMoveChange < 0) {
      this.scrollDirection = 0;
    }

    this.mouseMoveChange = event.pageY + window.scrollY;
    const _id = this.task;
    // console.log("mousemove", event.pageY, event.clientY, this.task);
    // console.log("this.ref", this.ref);
    // const newHeight =
    //   -event.pageY -
    //   this.tasksRef.current.getBoundingClientRect().top +
    //   this.yPositionOfHeadlineClick -
    //   10;

    const newHeight =
      -window.scrollY +
      event.pageY -
      10 -
      this.tasksRef.current.getBoundingClientRect().top +
      this.yPositionOfHeadlineClick;

    this.ref.find((e) => e._id === _id).taskRef.style.top = newHeight + "px";
    // console.log("newHeight", newHeight, "_id", _id);
    // if (Math.abs(this.newHeight - newHeight) < 20) {
    // } else {
    //   this.newHeight = newHeight;
    const newTasks = _.cloneDeep(this.state.tasks); //.filter((t) => {
    //  return true; //t._id !== this.task;
    // });
    // console.log(">> newTasks", newTasks);
    // console.log("this.ref", this.ref);
    this.ref.forEach((ref) => {
      if (ref.taskRef) {
        // console.log(
        //   "ref.taskRef.getBoundingClientRect",
        //   ref.taskRef //.getBoundingClientRect().top
        // );
        // const selected = newTasks.find((n) => n._id === ref._id);
        // if (selected) {
        //   selected.top = ref.taskRef.getBoundingClientRect().top;
        // }
        // ref.taskRef.style.position = "";
        // ref.taskRef.style.top = "";
        if (ref._id === this.randomId) {
          newTasks.find((n) => n._id === this.randomId).top =
            newHeight + this.scrollDirection * 65;
        }
      }
    });
    this.newHeight = newHeight;

    const tops = [];
    newTasks.forEach((n) => tops.push(n.top));
    console.log("tops", tops);

    // const j1 = JSON.stringify(newTasks);
    newTasks.sort((a, b) => (a.top > b.top ? 1 : -1));
    // const j2 = JSON.stringify(newTasks);

    // if (j1 !== j2) {
    // console.log(">>>> newTasks", newTasks);
    // console.log("j1", j1, "j2", j2);
    this.setState({ tasks: newTasks });

    // this.throttled(newTasks);
    // }
    // }
  };

  //   throttled = _.debounce((newTasks) => {
  //     console.log("debounce");
  //     // const j1 = JSON.stringify(newTasks);
  //     newTasks.sort((a, b) => (a.top > b.top ? 1 : -1));
  //     // const j2 = JSON.stringify(newTasks);

  //     // if (j1 !== j2) {
  //     console.log(">>>> newTasks", newTasks);
  //     // console.log("j1", j1, "j2", j2);
  //     this.setState({ tasks: newTasks });
  //   }, 1000);

  saveTasksOrder = async (tasks) => {
    const order = [];
    tasks.forEach((t) => {
      order.push(t._id);
    });
    console.log("order", order);

    const URL = TASK_SORT;
    const username = this.props.userSettings.username;

    await axios
      .post(
        URL,
        {
          username: username,
          order: order,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("sorted", response);
        return response;
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  render() {
    // console.log("render", this.state.tasks);
    return (
      <div ref={this.tasksRef} style={{ minHeight: 200 }}>
        {_.cloneDeep(this.state.tasks).map((t) => {
          if (typeof t._id !== "string") {
            return (
              <div
                key={11}
                ref={(ref) =>
                  (this.ref.find((e) => e._id === t._id).taskRef = ref)
                }
                style={{
                  height: this.height,
                  width: 300,
                  margin: 10,
                  backgroundColor: this.bgColor,
                  filter: "blur(3px)",
                  zIndex: 0,
                  opacity: 0.5,
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
        <button
          onClick={() => this.props.changeAction("addNewTask")}
          ref={this.addNewTaskRef}
          style={{
            visibility: "hidden",
            margin: "10px 20px 10px 30px",
            padding: "10px 20px 10px 20px",
          }}
        >
          Add +
        </button>
      </div>
    );
  }
}
