import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
//import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
//import { useNavigate } from "react-router";
import Login from "../components/Login.js";
import Dialog from "@mui/material/Dialog";

export default function JobDescription(props) {
  //const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  //go to login page
  const goToLogin = () => {
    const session = getDefaultSession();

    if (session.info.isLoggedIn) {
      navigate(`/JobMatch/${props.jobId}`);
    } else {
      props.login();
    }
  };
  */

  return (
    <Box sx={{ width: "95%", margin: "auto" }}>
      <Typography
        variant="h3"
        sx={{ paddingBottom: "10px", paddingTop: "5px" }}
      >
        {props.job.title}
      </Typography>
      <Typography sx={{ paddingBottom: "10px" }}>{props.job.intro} </Typography>
      <Typography variant="h6">Tasks</Typography>
      <ul>
        {props.job.tasks.map((task, index) => (
          <Typography component="li" variant="subtitle1" key={task}>
            {task}
          </Typography>
        ))}
      </ul>
      <Typography variant="h6">Skills</Typography>
      <ul>
        {props.job.skills.map((skill, index) => (
          <Typography component="li" variant="subtitle1" key={skill}>
            {skill}
          </Typography>
        ))}
      </ul>

      <Button
        variant="contained"
        disabled
        sx={{ marginBottom: "10px", marginRight: "10px" }}
      >
        Soliciteer via e-mail
      </Button>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ marginBottom: "10px" }}
      >
        Soliciteer via solid-pod
      </Button>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <Login jobId={props.jobId} />
        </Dialog>
      </Box>
    </Box>
  );
}
