import React from "react";
import NavBar from "./Navbar.js";
import { useParams } from "react-router-dom";
import LoginService from "../services/LoginService";

export default function JobMatch() {
  let params = useParams();

  //completes login
  LoginService.redirectAfterLogin();

  return (
    <div>
      <NavBar />
      <p>{params.id}</p>
    </div>
  );
}
