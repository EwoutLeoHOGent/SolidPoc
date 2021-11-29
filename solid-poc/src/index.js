import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SolidPoc from "./components/App.js";
import Login from "./components/Login.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div className="mainDiv">
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/Test" />}></Route>
          <Route exact path="/Test" element={<SolidPoc />}></Route>;
          <Route exact path="/Login" element={<Login />}></Route>;
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
