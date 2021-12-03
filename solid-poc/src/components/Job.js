import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import jobs from "../data/jobs.json";
import JobDescription from "./JobDescription";
import NavBar from "./Navbar";

export default function Job() {
  const navigate = useNavigate();

  let params = useParams();

  const goToLogin = () => {
    navigate(`/Login`, { state: { id: `${params.id}` } });
  };

  return (
    <div>
      <NavBar />
      <JobDescription
        job={jobs[params.id - 1]}
        login={goToLogin}
        jobId={params.id}
      />
    </div>
  );
}
