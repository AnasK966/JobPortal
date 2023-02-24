import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const AppliedCandidates = () => {
  const [appliedCandidates, setAppliedCandidates] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getAppliedJobs() {
      const res = await fetch('http://localhost:3000/cmp/dashboard/post/candidates/' + id);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      setAppliedCandidates(data.data);
    }
    getAppliedJobs();
  }, []);

  const cmpname = localStorage.getItem('cmpName')
  const country = localStorage.getItem('cmpCountry')
  const city = localStorage.getItem('cmpCity')

  localStorage.setItem("empProfile", "true");

  const navigate = useNavigate();

  const renderAppliedCandidates = () => {
    return appliedCandidates.map((j) => {
      return (
        <Tablerow key={j._id}>
          <TableValue>{j.firstName}</TableValue>
          <TableValue>{j.email}</TableValue>
          <TableValue>{j.ph_no}</TableValue>
          <td>
            <ViewButon onClick={() => navigate('/empProfile/' + j._id)}>
              View Profile
            </ViewButon>
          </td>
        </Tablerow>
      );
    });
  };

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
          <p>{city }</p>
          <p>{country}</p>
        </EmpSubDiv1>
        <EmpSubDiv2>
          {/* <EditProfileButton>Edit Profile</EditProfileButton> */}
          <LogoutButton onClick={() => logOut()}>Log Out</LogoutButton>
        </EmpSubDiv2>
      </EmpDetailDiv>
      <hr />
      <EmpJobDiv>
        <h2>Applied Candidates</h2>
        <TableDiv>
          <thead>
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone No</TableHead>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{appliedCandidates && renderAppliedCandidates()}</tbody>
        </TableDiv>
      </EmpJobDiv>
    </Main>
  );
};

export default AppliedCandidates;

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
  width: 170px;
  height: 32px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
    cursor: pointer;
  }
`;
