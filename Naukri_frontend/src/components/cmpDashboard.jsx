import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const CmpDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState({ err_msg: '', data: []});
  const [SearchParams] = useSearchParams(); 
  const cmp_id = SearchParams.get('s')
  useEffect(() => {
    async function getAppliedJobs() {
      let responseObj = {err_msg: '', data: []}
      const res = await fetch("http://localhost:3000/cmp/dashboard?q=" + cmp_id);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      console.log(data)
      responseObj.err_msg = data.message
      responseObj.data = data.jobs
      setAppliedJobs(responseObj);
    }
    getAppliedJobs();
  }, []);

  const cmpname = localStorage.getItem('cmpName')
  const country = localStorage.getItem('cmpCountry')
  const city = localStorage.getItem('cmpCity')


  localStorage.setItem("empProfile", "true");

  const navigate = useNavigate();

  const renderAppliedJobs = () => {
    if (appliedJobs.data === undefined) {
      return alert('No Jobs Posted !!!')
    } else {
      return appliedJobs.data.map((j) => {
        return (
          <Tablerow key={j._id}>
            <TableValue>{j.title}</TableValue>
            <TableValue>{j.no_of_candidates}</TableValue>
            <TableValue>{j.jobtype}</TableValue>
            <td>
              <ViewButon onClick={() => navigate(`/appliedCandidates/${j._id}`)}>
                View Details
              </ViewButon>
              <ViewButon onClick={() => deleteJobs(j._id)}>
                Delete
              </ViewButon>
            </td>
          </Tablerow>
        );
      });
    }
  };

  const deleteJobs = (id) => {
    async function deleteJob() {
      console.log(id)
      const res = await fetch('http://localhost:3000/cmp/delPost/' + id, {
        method: 'DELETE'
      })
      alert('Job Deleted!!!')
    }
    deleteJob()
  }
  const closeJobs = (id) => {
    async function closeJob() {
      console.log(id)
      const res = await fetch('http://localhost:3000/cmp/closeJob/' + id, {
        method: 'DELETE'
      })
      alert('Job Closed!!!')
    }
    closeJob()
  }

  const logOut = () => {
    localStorage.removeItem("role");
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.setItem('userStatus', 'false')
    localStorage.removeItem("cmpName");
    localStorage.removeItem("cmpCountry");
    localStorage.removeItem("cmpCity");
    navigate("/");
  };

  return (
    <Main>
      <EmpDetailDiv>
        <EmpSubDiv1>
          <h1>{ cmpname}</h1>
          <p>{ city}</p>
          <p>{ country}</p>
        </EmpSubDiv1>
        <EmpSubDiv2>
          {/* <EditProfileButton>Edit Profile</EditProfileButton> */}
          <LogoutButton onClick={() => logOut()}>Log Out</LogoutButton>
        </EmpSubDiv2>
      </EmpDetailDiv>
      <hr />
      <EmpJobDiv>
        <h2>Posted Jobs</h2>
        <TableDiv>
          <thead>
            <tr>
              <TableHead>Position</TableHead>
              <TableHead>Required Candidate</TableHead>
              <TableHead>Job Type</TableHead>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{appliedJobs && renderAppliedJobs()}</tbody>
        </TableDiv>
      </EmpJobDiv>
    </Main>
  );
};

export default CmpDashboard;

// STYLED CSS
const Main = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 2%;
  margin-left: 10%;
  margin-right: 10%;
  height: 100%;
`;

const EmpDetailDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmpSubDiv1 = styled.div`
  padding: 40px;
`;
const EmpSubDiv2 = styled.div`
  padding: 40px;
`;

const LogoutButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 7px;
  border: none;
  width: 100px;
  height: 40px;
  margin-left: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
    cursor: pointer;
  }
`;

const EditProfileButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 7px;
  border: none;
  width: 100px;
  height: 40px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
    cursor: pointer;
  }
`;

const EmpJobDiv = styled.div`
  margin-top: 10px;
  padding: 40px;
`;

const TableDiv = styled.table`
  padding: 20px;
  width: 100%;
  // border: 1px solid black;
`;

const Tablerow = styled.tr`
  text-align: center;
  border: 1px solid black;
`;

const TableHead = styled.th`
  border-bottom: 1px solid grey;
`;

const TableValue = styled.td`
  border-bottom: 1px solid grey;
`;

const ViewButon = styled.button`
  background-color: grey;
  margin-top: 2px;
  color: white;
  padding: 10px;
  border-radius: 7px;
  border: none;
  width: 180px;
  height: 32px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
    cursor: pointer;
  }
`;
