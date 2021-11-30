import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SolidPoc from "./components/App.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Job from "./components/Job.js";
import JobMatch from "./components/JobMatch.js";
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
          <Route exact path="/" element={<Navigate to="/Home" />}></Route>
          <Route exact path="/Test" element={<SolidPoc />}></Route>;
          <Route exact path="/Login" element={<Login />}></Route>;
          <Route exact path="/Home" element={<Home />}></Route>;
          <Route exact path="/Job/:id" element={<Job />}></Route>;
          <Route exact path="/JobMatch/:id" element={<JobMatch />}></Route>;
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
