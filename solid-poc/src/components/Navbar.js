import React from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  const navigate = useNavigate();

  const goToJobs = () => {
    navigate(`/Home`);
  };

  return (
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
  );
}
