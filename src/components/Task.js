import React, { Component } from "react";
import axios from "axios";
import { TASK_UPDATE, TASK_COLOR_SET } from "./../config/endpoints";
import {
  Boss,
  TaskBoss,
  Header,
  Headline,
  Escape,
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
} from "./styled-components/NewTaskStyled";

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

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.headlineRef = React.createRef();
    this.textRef = React.createRef();

    this.state = { editMode: false, color: this.props.taskInfo.color };
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

  render() {
    console.log("taskInfo", this.props.taskInfo);
    let d = new Date(this.props.taskInfo.createdAt);
    console.log("d", d);
    return (
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
                <option style={{ color: c }}>{c}</option>
              ))}
            </select>
          </ColorDiv>
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
        )}
      </TaskBoss>
    );
  }
}
