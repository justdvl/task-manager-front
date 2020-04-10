import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { withStackContext } from "./utils/StackProvider";
import Tasks from "./components/Tasks.js";

const ALREADY_EXISTS = "ALREADY_EXISTS";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      word: "",
      translation: "",
      allPairs: [],
    };
  }

  //   changeWord = event => {
  //     this.setState({
  //       word: event.target.value
  //     });
  //   };

  //   changeTranslation = event => {
  //     this.setState({
  //       translation: event.target.value
  //     });
  //   };

  //   clearInput = () => {
  //     this.setState({
  //       word: "",
  //       translation: ""
  //     });
  //   };

  //   changePage = pathName => {
  //     this.props.history.push(pathName);
  //   };

  //   sendAdd = async (e, type = "add") => {
  //     console.log("sendAdd", this.state.word, this.state.translation);
  //     const URL = `http://localhost:8000/languages/${type}`;
  //     console.log("URL", URL);
  //     // const URL = `http://localhost:8000/languages/add/${this.state.addKey}/${this.state.addValue}`;
  //     // const response = await axios.get(URL, {});
  //     //
  //     // let data = response.data;

  //     const data = {
  //       word: this.state.word,
  //       translation: this.state.translation
  //     };

  //     await axios
  //       .post(URL, data, {
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         withCredentials: true
  //       })
  //       .then(response => {
  //         console.log("response", response.data);

  //         if (type === "edit") {
  //           console.log("wont edit again");
  //           return;
  //         }
  //         if (response.data === ALREADY_EXISTS) {
  //           this.sendAdd(null, "edit");
  //         } else {
  //           console.log(type, "succeeded");
  //         }
  //       });

  //     console.log("data", data);

  //     this.setState({
  //       id: this.state.id + 1
  //     });

  //     this.clearInput();
  //   };

  //   getAll = async e => {
  //     const URL = `http://localhost:8000/languages/get-all`;
  //     console.log("URL", URL);

  //     await axios
  //       .post(
  //         URL,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           withCredentials: true
  //         }
  //       )
  //       .then(response => {
  //         console.log("response", response.data);
  //         this.setState({
  //           allPairs: response.data
  //         });
  //       });
  //   };

  render() {
    console.log("url", this.props.history.location);
    console.log("props", this.props);
    return (
      <div className="App" style={{ position: "relative" }}>
        <Tasks />
      </div>
    );
  }
}

export default withRouter(withStackContext(App));
