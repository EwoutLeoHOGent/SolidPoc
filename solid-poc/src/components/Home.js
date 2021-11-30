import React, { useState, useEffect } from "react";
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
import jobs from "../data/jobs.json";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

export default function Home() {
  const [error, setError] = useState(null);
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
    AclService.getRights()
      .then((response) => {
        setError(null);
        console.log(response);

        const rights = AclService.getAccesRights(response);
        console.log(rights);
      })
      .catch((e) => {
        setError("Fetching rights has failed");
      });
  };

  //completes login
  LoginService.redirectAfterLogin();

  //go to job details
  const goToJobDetails = (id) => {
    navigate("/Job/" + id);
  };

  useEffect(() => {
    const session = getDefaultSession();
    console.log(session.info);
  });

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
      <div hidden={!error}>
        <Alert id="errorAlert" severity="error">
          {error}
        </Alert>
      </div>
      <Container maxWidth="md" component="main" sx={{ marginTop: "10px" }}>
        <Grid container spacing={5} alignItems="flex-end">
          {jobs.map((job, index) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={index} xs={12} md={6}>
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
                    variant={"contained"}
                    onClick={giveRightsToCompany}
                  >
                    Give rights
                  </Button>
                  <Button fullWidth variant="contained" onClick={getRights}>
                    Get rights
                  </Button>
                </CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    goToJobDetails(job.id);
                  }}
                >
                  Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
