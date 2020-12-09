import React from "react";
import Routes from "./utils/Routes";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./utils/ContextProvider";
import StackContextProvider from "./utils/StackProvider";
import Headline from './components/Headline';
const REACT_APP_SUBDIRECTORY = process.env.REACT_APP_SUBDIRECTORY;

const RouterWrapper = () => {
  return (
    <BrowserRouter basename={REACT_APP_SUBDIRECTORY}>
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
