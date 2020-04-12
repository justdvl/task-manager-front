import React from "react";
import Routes from "./utils/Routes";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./utils/ContextProvider";
import StackContextProvider from "./utils/StackProvider";

const RouterWrapper = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <StackContextProvider>
          <Routes />
        </StackContextProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default RouterWrapper;
