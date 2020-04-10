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

export default class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "" };
  }

  add = async () => {
    console.log("add", this.state.text);
    const URL = ADD_NEW_TASK;
    const username = this.props.userSettings.username;

    const response = await axios
      .post(
        URL,
        {
          username: username,
          text: this.state.text,
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

    console.log("sent");
    this.close();
  };

  close = () => {
    console.log("close");
    this.props.changeAction("");
  };

  render() {
    return (
      <Boss>
        <Header>
          <Headline>New Task!</Headline>

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
