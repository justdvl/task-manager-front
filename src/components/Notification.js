import React from "react";
import styled, { keyframes } from "styled-components";

const Fade = keyframes`
    0% { opacity: 0 }
    7% { opacity: 1 }
    80% { opacity: 1 }
    100% { opacity: 0 }
`;

const NotificationBoss = styled.div`
  position: fixed;
  bottom: 0px;
  right: 10px;
  margin-bottom: 10px;
`;

const NotificationDiv = styled.div`
  margin-top: 10px;
  margin-right: 10;
  padding: 10px 20px 10px 20px;
  font-size: 200%;
  ${(props) => props.type === "success" && `background: #4CAF50`};
  ${(props) => props.type === "info" && `background: #60BBD9`};
  ${(props) => props.type === "warning" && `background: #FFCC00`};
  ${(props) => props.type === "error" && `background: #ff472c`};
  animation: ${Fade} ${(props) => (props.duration - 100) / 1000}s linear
    forwards;
`;

//type: success info warning error

export default class Notification extends React.Component {
  render() {
    if (
      !(
        this.props.stack &&
        this.props.stack.stack[0] &&
        this.props.stack.stack[0].headline
      )
    ) {
      return null;
    }

    return (
      <NotificationBoss>
        {this.props.stack.stack.map((s, i) => {
          return (
            <NotificationDiv
              order={i}
              key={s.id}
              type={s.type}
              duration={s.timeout}
            >
              <div>{s.headline}</div>
              <div style={{ fontSize: "70%", paddingTop: 10 }}>{s.text}</div>
            </NotificationDiv>
          );
        })}
      </NotificationBoss>
    );
  }
}
