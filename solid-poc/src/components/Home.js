import React from "react";
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

export default function Home() {
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

  /*
  useEffect(() => {
    const session = getDefaultSession();
    console.log(session);
  });
  */

  const jobs = [
    {
      title: "Junior Java developer",
      description: [
        "10 users included",
        "2 GB of storage",
        "Help center access",
        "Email support",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
    },
    {
      title: "Data expert",
      description: [
        "20 users included",
        "10 GB of storage",
        "Help center access",
        "Priority email support",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
    },
    {
      title: "Business analist",
      description: [
        "50 users included",
        "30 GB of storage",
        "Help center access",
        "Phone & email support",
      ],
      buttonText: "Give acces",
      buttonVariant: "contained",
    },
  ];

  return (
    /*
    <div>
      <p>Logged in</p>
    </div>
    */
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
                    {job.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
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
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      ></Container>
    </div>
  );
}
