import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { useNavigate } from "react-router";

export default function JobDescription(props) {
  const navigate = useNavigate();

  //go to login page
  const goToLogin = () => {
    const session = getDefaultSession();

    if (session.info.isLoggedIn) {
      navigate(`/JobMatch/${props.jobId}`);
    } else {
      props.login();
    }
  };

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
        onClick={goToLogin}
        sx={{ marginBottom: "10px" }}
      >
        Soliciteer via solid-pod
      </Button>
    </Box>
  );
}
