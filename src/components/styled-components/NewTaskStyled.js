import styled from "styled-components";

export const Boss = styled.div``;
export const TaskWrap = styled.div`
  width: 390px;
  display: flex;
  margin: 10px;
  ${(props) => (props.moved ? `border 2px solid red` : ``)}
`;
export const TaskBoss = styled.div`
  width: 300px;
`;
export const Header = styled.div`
  display: flex;
  height: 23px;
  position: relative;
  background-color: ${(props) => (props.color ? props.color : "#999")};
`;
export const ColorDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2px;
`;

export const Headline = styled.input`
  padding-top: 1px;
  float: left;
  font-weight: 600;
  text-align: left;
  font-size: 14px;
  width: calc(100% - 42px);
`;

export const TaskHeadline = styled.div`
  padding-top: 1px;
  padding-left: 5px;
  float: left;
  font-weight: 600;

  text-align: left;
  font-size: 14px;
  width: calc(100% - 4px);
`;

export const Body = styled.div`
  display: flex;
`;

export const TaskBody = styled.div`
  min-height: 70px;
  background: white;
  color: black;
  text-align: left;
  padding-left: 5px;
  white-space: pre-line;
`;

export const TaskFooter = styled.div`
  min-height: 20px;
  background: #eee;
  color: black;
  text-align: left;
  padding-left: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
  color: #777;
`;

export const Autor = styled.div``;

export const Time = styled.div`
  padding-right: 5px;
`;

export const Escape = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 20px;
  width: 20px;
  background: red;
  text-align: center;
`;

export const TaskEscape = styled.div`
  color: #222;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 30px;
  background: brown;
  text-align: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const Textarea = styled.textarea`
  height: 50px;
  width: 260px;
`;

export const Add = styled.button`
  background: green;
  border: 1px solid darkgreen;
`;
export const SaveCancel = styled.div`display: flex;
justify-content: flex-end;
}
`;
export const Cancel = styled.button`
  background: grey;
  border: 1px solid grey;
  cursor: pointer;
`;
export const Save = styled.button`
  background: green;
  border: 1px solid darkgreen;
  cursor: pointer;
`;

export const ImageWrap = styled.div`
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


`;

export const ImageUpload = styled.button``;

export const Image = styled.img`
  height: 55px;
  width: 85px;
  margin-top: 3px;
`;

export const BigImage = styled.img`
  max-width: 92%;
  max-height: 90%;
  position: fixed;
  left: 4%;
  top: 10px;
  z-index: 21;
`;
