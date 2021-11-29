import React, { useState } from "react";
import LoginService from "../services/LoginService";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import AclService from "../services/AclService";
import Alert from "@mui/material/Alert";

export default function Home() {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  //logout user from application
  const logoutUser = () => {
    LoginService.logoutUser();
    navigate("/Login");
  };

  const giveRightsToCompany = () => {
    AclService.giveAcces();
  };

  const getRights = () => {
    AclService.getRights();
  };

  //completes login
  LoginService.redirectAfterLogin();

  const jobs = [
    {
      title: "Junior Java developer",
      description: [
        "------------------",
        "------------------",
        "------------------",
        "------------------",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
      id: 1,
    },
    {
      title: "Data expert",
      description: [
        "------------------",
        "------------------",
        "------------------",
        "------------------",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
      id: 2,
    },
    {
      title: "Business analist",
      description: [
        "------------------",
        "------------------",
        "------------------",
        "------------------",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
      id: 3,
    },
  ];

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
          <Typography
            id="loggedInUser"
            variant="h6"
            color="inherit"
            sx={{ flexGrow: 1 }}
          />
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={logoutUser}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div hidden={!hasError}>
        <Alert id="errorAlert" severity="error">
          This is an error alert — check it out!
        </Alert>
      </div>
      <Container maxWidth="md" component="main" sx={{ marginTop: "10px" }}>
        <Grid container spacing={5} alignItems="flex-end">
          {jobs.map((job) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={job.title} xs={12} md={6}>
              <Card>
                <CardHeader
                  title={job.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {job.description.map((line, index) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={index}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={job.buttonVariant}
                    onClick={giveRightsToCompany}
                  >
                    {job.buttonText}
                  </Button>
                  <Button
                    fullWidth
                    variant={job.buttonVariant}
                    onClick={getRights}
                  >
                    Get rights
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
