import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/js/bootstrap";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { createStore } from 'redux'
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "@reduxjs/toolkit";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './index.css'
// page first 
function Applouding() {

  return (
    <>
      <div class="center">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </>
  );
}

export default Applouding;

