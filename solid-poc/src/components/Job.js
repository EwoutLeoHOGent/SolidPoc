import React from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import jobs from "../data/jobs.json";
import JobDescription from "./JobDescription";

export default function Job() {
  const navigate = useNavigate();

  let params = useParams();

  const goToJobs = () => {
    navigate(`/Home`);
  };

  const goToLogin = () => {
    navigate(`/Login`, { state: { id: `${params.id}` } });
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Solid proof of concept
          </Typography>
          <Button size="small" onClick={goToJobs}>
            Jobs
          </Button>
        </Toolbar>
      </AppBar>
      <JobDescription job={jobs[params.id - 1]} login={goToLogin} />
    </div>
  );
}
