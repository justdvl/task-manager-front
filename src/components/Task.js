import React, { Component } from "react";
import axios from "axios";
import {
  TASK_UPDATE,
  TASK_COLOR_SET,
  TASK_REMOVE,
} from "./../config/endpoints";
import {
  TaskBoss,
  Header,
  TaskEscape,
  TaskBody,
  TaskFooter,
  Autor,
  Time,
  TaskHeadline,
  SaveCancel,
  Save,
  Cancel,
  ColorDiv,
  TaskWrap,
  ImageWrap,
  Image,
  BigImage,
  DraggableHeadline,
} from "./styled-components/NewTaskStyled";
import { withStackContext } from "./../utils/StackProvider";
import { withRouter } from "react-router-dom";

const COLORS = [
  "Red",
  "Green",
  "LimeGreen",
  "Indigo",
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

    await axios
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

    await axios
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
        this.props.getAllTasks();
        return response;
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  removeTask = async (_id) => {
    const URL = TASK_REMOVE;

    await axios
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
    // this.setState({ profileImg: e.target.files[0] });

    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    formData.append("_id", this.props.taskInfo._id);
    console.log("saving file _id", this.props.taskInfo._id);
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
              <DraggableHeadline
                ref={(ref) => this.props.refe(ref)}
                onMouseDown={(e) =>
                  this.props.onMouseDown(e, this.props.taskInfo._id)
                }
                onMouseUp={this.props.onMouseUp}
              ></DraggableHeadline>
              <ColorDiv>
                <select
                  defaultValue={this.props.taskInfo.color}
                  onChange={(e) => this.colorChange(e, this.props.taskInfo._id)}
                >
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
            <TaskFooter>
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
            )}{" "}
          </TaskBoss>
          <ImageWrap onSubmit={this.onSubmit}>
            <label
              htmlFor={`file-${this.props.taskInfo._id}`}
              style={{
                fontSize: 12,
                userSelect: "none",
                border: "1px solid #777",
                padding: "1px 4px 2px 4px",
                marginTop: "1px",
              }}
            >
              Select Image
            </label>

            <input
              type="file"
              id={`file-${this.props.taskInfo._id}`}
              style={{ visibility: "hidden", display: "none" }}
              onChange={this.onFileChange}
            />

            {/* <ImageUpload>Upload img</ImageUpload> */}
            {this.props.taskInfo.img && (
              <Image
                src={this.props.taskInfo.img}
                onClick={() => {
                  this.setState({ bigImgOpen: true });
                }}
                style={{ cursor: "zoom-in" }}
              />
            )}
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
