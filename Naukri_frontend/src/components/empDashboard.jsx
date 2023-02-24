import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const EmpDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState();
  const {emp_id} = useParams()
  console.log(emp_id)
  useEffect(() => {
    async function getAppliedJobs() {
      const res = await fetch('http://localhost:3000/emp/dashboard/'+emp_id);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      setAppliedJobs(data.job);
    }
    getAppliedJobs();
  }, []);
  const fname = localStorage.getItem('empfName')
  const lname = localStorage.getItem('emplName')
  const country = localStorage.getItem('empCountry')
  const city = localStorage.getItem('empCity')

  localStorage.setItem('empProfile', 'true')

  const navigate = useNavigate();

  const renderAppliedJobs = () => {
    return appliedJobs.map((j) => {
      return (
        <Tablerow key={j._id}>
          <TableValue>{j.title}</TableValue>
          <td>
            <ViewButon
              onClick={() => navigate(`/appliedJobDetail/${j._id}`)}
            >
              View Details
            </ViewButon>
          </td>
        </Tablerow>
      );
    });
  };

  const logOut = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.setItem('userStatus','false')
    localStorage.removeItem("empfName");
    localStorage.removeItem("emplName");
    localStorage.removeItem("empCountry");
    localStorage.removeItem("empCity");
    navigate('/');
  };

  return (
    <Main>
      <EmpDetailDiv>
        <EmpSubDiv1>
          <h1>{fname} { lname}</h1>
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
        <h2>Applied Jobs</h2>
        <TableDiv>
          <thead>
            <tr>
              <TableHead>Position</TableHead>
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

export default EmpDashboard;

// STYLED CSS
const Main = styled.div`
border-radius: 10px;
  margin-left: 10%;
  margin-right: 10%;
  height: 100%;
  margin-top: 2%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

// const EditProfileButton = styled.button`
//   background-color: green;
//   color: white;
//   padding: 10px;
//   border-radius: 7px;
//   border: none;
//   width: 100px;
//   height: 40px;
//   &:hover {
//     box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
//       rgba(0, 0, 0, 0.23) 0px 6px 6px;
//     transition: 300ms;
//     cursor: pointer;
//   }
// `;

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
  color: white;
  padding: 10px;
  border-radius: 7px;
  border: none;
  width: 100px;
  height: 32px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
    cursor: pointer;
  }
`;
