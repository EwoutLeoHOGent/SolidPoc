import React from "react";
import NavBar from "./Navbar.js";
import { useParams } from "react-router-dom";
import LoginService from "../services/LoginService";
import ProfileService from "../services/ProfileService";
import Button from "@mui/material/Button";

export default function JobMatch() {
  let params = useParams();

  const getProfileData = () => {
    ProfileService.getSkillsFromUser().then((e) => {});
  };

  //completes login
  LoginService.redirectAfterLogin();

  return (
    <div>
      <NavBar />
      <p>{params.id}</p>
      <Button variant="contained" onClick={getProfileData}>
        Get Profile Data
      </Button>
    </div>
  );
}
