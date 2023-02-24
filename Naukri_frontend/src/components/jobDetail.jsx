import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

const JobDetail = () => {
  const [job, setJob] = useState();
  const [jobInfo, setJobInfo] = useState({ jobId: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getJobDetail() {
      const res = await fetch("http://localhost:3000/emp/jobDetail/" + id);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      setJob(data.job);
    }
    getJobDetail();
  }, []);
  const emp_id = localStorage.getItem("user");
  const empProfile = localStorage.getItem("empProfile");
  console.log(typeof empProfile);


  const handleBackButton = () => {
    navigate("/emp/jobs")
  }

  const renderJobDetail = () => {
    return (
      <JobDetailDiv>
        <JobAttributes>
          <div>
            <h3>{job.title}</h3>
          </div>
          <div>
            <Link to={`/emp/apply?emp_id=${emp_id}&job_id=${id}`}>
              <ApplyButton>Apply Now</ApplyButton>
            </Link>
          </div>
        </JobAttributes>
        <br />
        <JobDetails>
          <div>
            <h3>Job Details</h3>
          </div>
          <div>
            <b>
              <p>Salary</p>
            </b>
            <p>
              {" "}
              {job.salRange.minSal} - {job.salRange.maxSal} Rs
            </p>
          </div>
          <div>
            <b>
              <p>Job Type</p>
            </b>
            <p>{job.jobtype}</p>
          </div>
        </JobDetails>
        <br />
        <FullJobDesc>
          <h3>Full Job Description</h3>
          <FullJobDescSubDiv>
            <div id="job-desc">{job.jobDesc}</div>
          </FullJobDescSubDiv>
        </FullJobDesc>
      </JobDetailDiv>
    );
  };

  return (
    <div id="job-detail">
      <BackButtonDiv>
        <div>
          <img
            src="/assets/back arrow.png"
            onClick={() => handleBackButton()}
          ></img>
        </div>
        <div id="go-back">Go Back To Job Searching</div>
      </BackButtonDiv>
      {job && renderJobDetail()}
    </div>
  );
};

export default JobDetail;

// STYLED CSS

const JobDetailDiv = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin-bottom: 40px;
  width: 50%;
  padding: 10px;
  margin-left: 20%;
  margin-right: 20%;
`;

const JobAttributes = styled.div`
  display: flex;
  // grid-template-rows: 20px 60px;
  justify-content: space-between;
  // row-gap: 5px;
  border-bottom: 1px solid grey;
  padding: 10px;
`;

const ApplyButton = styled.button`
  background-color: blue;
  color: white;
  padding: 8px;
  width: 140px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const JobDetails = styled.div`
  display: grid;
  grid-template-rows: 30px 50px 50px;
  rows-gap: 10px;
  border-bottom: 1px solid grey;
  padding: 10px;
`;

const FullJobDesc = styled.div`
  display: grid;
  grid-template-rows: 30px auto;
  padding: 10px;
  text-align: justify;
`;

const FullJobDescSubDiv = styled.div`
  height: 500px;
  word-break: break-word;
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
`;

const BackButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  cursor: pointer;
  margin-left: 20%;
`;
