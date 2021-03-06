import React, { useState } from "react";
import LoginService from "../services/LoginService";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

export default function Login(props) {
  const [podProvider, setPodProvider] = useState(null);
  const [error, setError] = useState(null);

  // Login to pod-provider
  const loginToPodProvider = (provider) => {
    LoginService.loginToPodProvider(provider, props.jobId)
      .then((res) => {
        setError(null);
      })
      .catch((e) => {
        console.log("tes", e);
        setError("Wrong url provided");
      });
  };

  const handlePodProviderChange = (event) => {
    setPodProvider(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography component="h1" variant="h5">
          Select your pod-provider
        </Typography>
        <Box hidden={!error} sx={{ width: "100%" }}>
          <Alert id="errorAlert" severity="error">
            {error}
          </Alert>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="filled-basic"
              variant="outlined"
              placeholder="e.g. https://inrupt.net"
              sx={{ flexGrow: "2" }}
              onChange={handlePodProviderChange}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, marginLeft: "5px" }}
              onClick={() => {
                loginToPodProvider(podProvider);
              }}
            >
              Log in
            </Button>
          </Box>
          <Divider
            variant="middle"
            sx={{ marginBottom: "10px", marginTop: "20px" }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              loginToPodProvider("https://inrupt.net");
            }}
          >
            Inrupt.net
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              loginToPodProvider("https://solidcommunity.net");
            }}
          >
            Solid Community
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              loginToPodProvider("https://solidweb.org");
            }}
          >
            Solid Web
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
