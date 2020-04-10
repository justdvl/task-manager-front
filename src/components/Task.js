import React, { Component } from "react";
import axios from "axios";
import {} from "./../config/endpoints";
import {
  Boss,
  TaskBoss,
  Header,
  Headline,
  Escape,
  Body,
  TaskBody,
  Textarea,
  Add,
} from "./styled-components/NewTaskStyled";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <TaskBoss>
        <Header>
          <Headline>Task name</Headline>
        </Header>
        <TaskBody>
          <div>Body of the task</div>
        </TaskBody>
      </TaskBoss>
    );
  }
}
