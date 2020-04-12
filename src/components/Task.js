import React, { Component } from "react";
import axios from "axios";
import {
  TASK_UPDATE,
  TASK_COLOR_SET,
  TASK_REMOVE,
} from "./../config/endpoints";
import {
  Boss,
  TaskBoss,
  Header,
  Headline,
  TaskEscape,
  Body,
  TaskBody,
  TaskFooter,
  Textarea,
  Add,
  Autor,
  Time,
  TaskHeadline,
  SaveCancel,
  Save,
  Cancel,
  ColorDiv,
  TaskWrap,
  ImageWrap,
  ImageUpload,
  Image,
  BigImage,
} from "./styled-components/NewTaskStyled";
import { withStackContext } from "./../utils/StackProvider";
import { withRouter } from "react-router-dom";

const COLORS = [
  "red",
  "green",
  "LimeGreen",
  "indigo",
  "LightSeaGreen",
  "SteelBlue",
  "DodgerBlue",
  "SandyBrown",
  "Chocolate",
  "RosyBrown",
  "DarkGoldenrod",
  "Gray",
];

class Task extends Component {
  constructor(props) {
    super(props);
    this.headlineRef = React.createRef();
    this.textRef = React.createRef();

    this.state = {
      editMode: false,
      color: this.props.taskInfo.color,
      profileImg: "",
      bigImgOpen: false,
    };
  }

  save = (_id) => {
    const headline = this.headlineRef.current.innerText
      ? this.headlineRef.current.innerText
      : "";
    const text = this.textRef.current.innerText
      ? this.textRef.current.innerText
      : "";

    this.update(_id, headline, text);
  };

  update = async (_id, caption, text) => {
    console.log("update");
    const URL = TASK_UPDATE;
    const username = this.props.userSettings.username;

    const response = await axios
      .post(
        URL,
        {
          _id,
          username,
          caption,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("response", response.data);

        this.setState({ editMode: false });
        this.props.value.addNotification("info", "Task saved    ", "", 3333);

        return response;
      })
      .catch((e) => {
        console.warn(e);
      });

    console.log("updated");
  };

  colorChange = async (e, _id) => {
    console.log("e", e.target.value, _id);
    this.setState({ color: e.target.value });

    const URL = TASK_COLOR_SET;
    const color = e.target.value;

    const response = await axios
      .post(
        URL,
        {
          _id,
          color,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("response", response.data);

        return response;
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  removeTask = async (_id) => {
    const URL = TASK_REMOVE;

    const response = await axios
      .post(
        URL,
        {
          _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("response", response.data);
        this.props.getAllTasks();

        this.props.value.addNotification("info", "Task removed", "", 3333);

        return response;
        //refresh all tasks
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  onFileChange = (e) => {
    this.setState({ profileImg: e.target.files[0] });

    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    formData.append("_id", this.props.taskInfo._id);
    axios
      .post("http://localhost:8000/api/user-profile", formData, {})
      .then((res) => {
        console.log(res);
        this.props.getAllTasks();
        this.props.value.addNotification(
          "info",
          "img uploaded",
          "hope all went well",
          3000
        );
      });
  };

  //   onSubmit = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("profileImg", this.state.profileImg);
  //     formData.append("_id", this.props.taskInfo._id);
  //     axios
  //       .post("http://localhost:8000/api/user-profile", formData, {})
  //       .then((res) => {
  //         console.log(res);
  //         this.props.getAllTasks();
  //       });
  //   };

  render() {
    console.log("taskInfo", this.props.taskInfo);
    console.log("props", this.props);
    let d = new Date(this.props.taskInfo.createdAt);
    return (
      <div>
        <TaskWrap>
          <TaskBoss>
            <Header color={this.state.color}>
              <TaskHeadline
                onClick={() => {
                  console.log("edit");
                  this.setState({ editMode: true });
                }}
                contentEditable={true}
                suppressContentEditableWarning={"true"}
                ref={this.headlineRef}
              >
                {this.props.taskInfo.caption}
              </TaskHeadline>
              <ColorDiv>
                <select
                  onChange={(e) => this.colorChange(e, this.props.taskInfo._id)}
                >
                  <option selected hidden>
                    Change color
                  </option>{" "}
                  {COLORS.map((c) => (
                    <option key={c} style={{ color: c }}>
                      {c}
                    </option>
                  ))}
                </select>
              </ColorDiv>
              <TaskEscape
                title="Remove task"
                onClick={() => {
                  this.removeTask(this.props.taskInfo._id);
                }}
              >
                X
              </TaskEscape>
            </Header>
            <TaskBody
              onClick={() => {
                console.log("edit");
                this.setState({ editMode: true });
              }}
              contentEditable={true}
              suppressContentEditableWarning={"true"}
              ref={this.textRef}
            >
              {this.props.taskInfo.text}
            </TaskBody>
            <TaskFooter
              onMouseDown={(e) =>
                this.props.onMouseDown(e, this.props.taskInfo._id)
              }
              onMouseUp={this.props.onMouseUp}
              ref={(ref) => this.props.refe(ref)}
            >
              <Autor>by: {this.props.taskInfo.username}</Autor>
              <Time>
                {d.toLocaleDateString()}, {d.toLocaleTimeString()}
              </Time>
            </TaskFooter>
            {this.state.editMode && (
              <SaveCancel>
                <Cancel
                  onClick={() => {
                    this.setState({ editMode: false });
                  }}
                >
                  Cancel
                </Cancel>
                <Save
                  onClick={() => {
                    this.save(this.props.taskInfo._id);
                  }}
                >
                  Save
                </Save>
              </SaveCancel>
            )}
          </TaskBoss>
          <ImageWrap onSubmit={this.onSubmit}>
            <input
              type="file"
              style={{ width: "100%" }}
              onChange={this.onFileChange}
            />

            {/* <ImageUpload>Upload img</ImageUpload> */}
            <Image
              src={this.props.taskInfo.img}
              onClick={() => {
                this.setState({ bigImgOpen: true });
              }}
              style={{ cursor: "zoom-in" }}
            />
          </ImageWrap>
        </TaskWrap>

        {this.state.bigImgOpen && (
          <BigImage
            src={this.props.taskInfo.img}
            onClick={() => {
              this.setState({ bigImgOpen: false });
            }}
            style={{ cursor: "zoom-out" }}
          />
        )}
      </div>
    );
  }
}

export default withRouter(withStackContext(Task));
