import React, { Component } from "react";
import axios from "axios";
import { ADD_NEW_TASK } from "./../config/endpoints";
import {
  Boss,
  Header,
  Headline,
  Escape,
  Body,
  Textarea,
  Add,
} from "./styled-components/NewTaskStyled";
import { COLORS } from './Task';

export default class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "", caption: "" };
  }

  add = async () => {
    const URL = ADD_NEW_TASK;
    const username = this.props.userSettings.username;

    await axios
      .post(
        URL,
        {
          username: username,
          caption: this.state.caption,
          text: this.state.text,
          color: COLORS[Math.floor(Math.random()*COLORS.length-1)],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.value.addNotification("info", "Task added", "", 3333);

        return response;
      })
      .catch((e) => {
        console.warn(e);
      });

    this.close();
  };

  close = () => {
    this.props.changeAction("");
  };

  render() {
    return (
      <Boss>
        <Header>
          <Headline
            onChange={(e) => {
              this.setState({ caption: e.target.value });
            }}
          />

          <Escape onClick={this.close}>X</Escape>
        </Header>
        <Body>
          <Textarea
            rows="3"
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
          ></Textarea>
          <Add onClick={this.add}>Add</Add>
        </Body>
      </Boss>
    );
  }
}
