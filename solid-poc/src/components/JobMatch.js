import React, { useState, useEffect } from "react";
import NavBar from "./Navbar.js";
import { useParams } from "react-router-dom";
import LoginService from "../services/LoginService";
import ProfileService from "../services/ProfileService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Typography } from "@mui/material";
import jobs from "../data/jobs.json";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function JobMatch() {
  const navigate = useNavigate();
  const [missingSkills, setMissingSkills] = useState([]);
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [color, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [podUrl, setPodUrl] = useState(null);
  const [path, setPath] = useState(null);
  const [motivation, setMotivation] = useState(null);

  const goToJobs = () => {
    navigate(`/Home`);
  };

  const handleClickOpen = () => {
    setPodUrl(ProfileService.getPodUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptClick = () => {
    setOpen(false);
    console.log(path);
    console.log(motivation);
  };

  const handlePathChange = (event) => {
    setPath(event.target.value);
  };

  const handleMotivationChange = (event) => {
    setMotivation(event.target.value);
  };

  let params = useParams();

  const getProfileData = () => {
    setIsLoading(true);

    ProfileService.getSkillsFromUser().then((skillsUser) => {
      const result = ProfileService.checkMatch(params.id, skillsUser);

      setMissingSkills(result[0]);
      setMatchingSkills(result[1]);

      const matchResult = Math.round(
        (result[1].length * 100) / jobs[params.id - 1].escoSkills.length
      );

      setResult(matchResult);

      if (matchResult >= 75) {
        setResult(matchResult);
        setResultMessage("U kan soliciteren");
        setColor("#00FF00");
      } else if (matchResult >= 50) {
        setResult(matchResult);
        setResultMessage(
          "U kan soliciteren, maar u matcht niet volledig met de job. Probeer ons te overtuigen!"
        );
        setColor("#FFA500");
      } else {
        setResult(matchResult);
        setResultMessage(
          "Sorry maar u komt niet in aanmerking om te soliciteren."
        );
        setColor("#FF0000");
      }
    });

    setIsLoading(false);
  };

  useEffect(() => {
    //completes login
    LoginService.redirectAfterLogin();
  });

  return (
    <div>
      <NavBar />
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h3" sx={{ paddingBottom: "10px" }}>
          {jobs[params.id - 1].title}
        </Typography>
        <Typography variant="body1">{jobs[params.id - 1].intro}</Typography>
      </Box>

      <Button
        variant="contained"
        onClick={getProfileData}
        sx={{ margin: "10px" }}
      >
        See if job is a match
      </Button>
      <Box hidden={!isLoading}>
        <CircularProgress />
      </Box>
      <Box hidden={!result} sx={{ padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "5px",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#EAEEF3",
              flexGrow: 1,
              minWidth: "450px",
              margin: "5px",
              flex: "1 1 0px",
            }}
          >
            <CardHeader title="Matching Skills" />
            <CardContent>
              <List>
                {matchingSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ whiteSpace: "initial" }}>
                      {skill}{" "}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card
            sx={{
              backgroundColor: "#EAEEF3",
              flexGrow: 1,
              minWidth: "450px",
              margin: "5px",
              flex: "1 1 0px",
            }}
          >
            <CardHeader title="Missing Skills" />
            <CardContent>
              <List>
                {missingSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CloseIcon sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ whiteSpace: "initial" }}>
                      {skill}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Box>
            <Typography>{result}%</Typography>
            <BorderLinearProgress
              variant="determinate"
              value={result}
              sx={{ width: "50%" }}
            />
            <Typography>{resultMessage}</Typography>
          </Box>
        </Box>
        {result >= 50 ? (
          <Button variant="contained" onClick={handleClickOpen}>
            Solliciteer
          </Button>
        ) : (
          <Button variant="contained" onClick={goToJobs}>
            Ga terug naar jobs
          </Button>
        )}
      </Box>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Solliciteren</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Geef hieronder een motivatie indien gewenst.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="motivatie"
              label="Motivatie"
              fullWidth
              variant="standard"
              onChange={handleMotivationChange}
            />
            <DialogContentText>
              Geef hieronder het juiste path naar je cv.
            </DialogContentText>
            <DialogContentText>{podUrl}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="path"
              label="Path"
              fullWidth
              variant="standard"
              onChange={handlePathChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Annuleren
            </Button>
            <Button variant="contained" onClick={handleAcceptClick}>
              Solliciteer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
