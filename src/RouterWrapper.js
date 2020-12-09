import React from "react";
import Routes from "./utils/Routes";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./utils/ContextProvider";
import StackContextProvider from "./utils/StackProvider";
import Headline from './components/Headline';

const RouterWrapper = () => {
  return (
    <BrowserRouter basename={"/task_manager"}>
      <ContextProvider>
        <StackContextProvider>
            <Headline />
            <Routes />
        </StackContextProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default RouterWrapper;
