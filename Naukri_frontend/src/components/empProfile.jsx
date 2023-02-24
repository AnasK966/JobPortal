import { useState } from "react";
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const EmpProfile = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  
  const [education, setEducation] = useState();
  const [skills, setSkills] = useState();
  const [certificates, setCertificates] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function getProfile() {
      const res = await fetch("http://localhost:3000/emp/profile/" + id);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      const Employee = data.data.Employee[0]
  console.log(data)
      setFirstName(Employee.firstName);
      setLastName(Employee.firstLame);
      setCountry(Employee.address.country);
      setCity(Employee.address.city);
      setCertificates(data.data.certificates)
      setSkills(data.data.skills)
      setEducation(data.data.education)
    }
    getProfile();
  }, []);
  console.log(education)
  console.log(skills)
  console.log(certificates)

  // console.log(education, skills, certificates)

  const renderSkills = () => {
    return skills.map((s) => {
      return <SkillLi>{s}</SkillLi>;
    });
  };

  const renderCertificates = () => {
    return certificates.map((c) => {
      return <SkillLi>{c}</SkillLi>;
    });
  };

  return (
    <Main>
      <EmpDetailDiv>
        <ImgDiv>
          <img src="/assets/profile.png" height={35} width={35}></img>
          <h1 id="profile-div">{firstName}</h1>
        </ImgDiv>
        {/* <div>
          <p>Manager</p>
          <p>Changan</p>
        </div> */}
        <div>
          <p>
            <b>Country :</b>{country}
          </p>
          <p>
            <b>City: </b>{ city}
          </p>
        </div>
      </EmpDetailDiv>
      <hr />
      <EmpAcademicsDiv>
        <div>
          <h1>Academics</h1>
        </div>
        <ImgDiv>
          <img src="/assets/education.png" height={20} width={20}></img>
          <h3 id="profile-div">
            <b>Education : </b>
            {education}
          </h3>
        </ImgDiv>
        <EmpAcademicsSubDiv>
          <EmpSkillDiv>
            <ImgDiv>
              <img src="/assets/skills.png" height={23} width={23}></img>
              <h3 id="profile-div">Skills:</h3>
            </ImgDiv>
            <SkillsUl>{skills && renderSkills()}</SkillsUl>
          </EmpSkillDiv>
          <EmpCertificateDiv>
            <ImgDiv>
              <img src="/assets/certificate.png" height={20} width={20}></img>
              <h3 id="profile-div">Certificates:</h3>
            </ImgDiv>
            <SkillsUl>{certificates && renderCertificates()}</SkillsUl>
          </EmpCertificateDiv>
        </EmpAcademicsSubDiv>
      </EmpAcademicsDiv>
    </Main>
  );
};

export default EmpProfile;

// STYLED CSS
const Main = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 2%;
  margin-bottom: 2%;
  height: 100%;
`;

const EmpDetailDiv = styled.div`
  padding: 40px;
  display: grid;
  grid-template-rows: 50px 50px;
`;

// const EmpDetailSubDiv = styled.div`
//   display: grid;
//   grid-template-rows: 100px 40px;
// `;

const EmpAcademicsDiv = styled.div`
  padding: 40px;
  display: grid;
  grid-template-rows: 70px 50px auto;
`;

const EmpAcademicsSubDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const EmpSkillDiv = styled.div`
  border-right: 1px solid grey;
`;

const EmpCertificateDiv = styled.div`
  margin-left: 30px;
`;

const SkillsUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const SkillLi = styled.li`
  // padding-t: 15px;
  margin-top: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
`;
