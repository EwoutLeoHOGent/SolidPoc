import React from "react";
import LoginService from "../services/LoginService";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Login() {
  // Login to pod-provider
  const loginToPodProvider = (provider) => {
    LoginService.loginToPodProvider(provider);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Select your pod-provider
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
