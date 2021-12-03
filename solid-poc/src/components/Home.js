import React from "react";
import NavBar from "./Navbar.js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import jobs from "../data/jobs.json";

export default function Home() {
  const navigate = useNavigate();
  /*
  const giveRightsToCompany = () => {
    AclService.giveAcces();
  };

  const getRights = () => {
    AclService.getRights()
      .then((response) => {
        setError(null);
        const rights = AclService.getAccesRights(response);
        console.log(rights);
      })
      .catch((e) => {
        setError("Fetching rights has failed");
      });
  };
  */

  //go to job details
  const goToJobDetails = (id) => {
    navigate(`/Job/${id}`);
  };

  return (
    <div>
      <NavBar />
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
                    {job.shortdescription.map((line, index) => (
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
                    variant="contained"
                    onClick={() => {
                      goToJobDetails(job.id);
                    }}
                  >
                    Details
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
