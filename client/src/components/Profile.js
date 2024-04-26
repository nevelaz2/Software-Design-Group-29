import React from 'react';
import { useState, useEffect } from "react";
import ProfileModal from './ProfileModal';
import '../styles/App.css';
import '../styles/Profile.css';

import { useAuth } from "../contexts/AuthContext";

function InfoBox(Props) {
  let containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    left: `${Props.x}px`,
    top: `${Props.y}px`
  };

  return (
    <div className={Props.name} style={containerStyles}>
      <h1 style={
        {fontSize: "15px",}
      }> {Props.title} </h1>
        {Props.children}
    </div>
  );
}

const Profile = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState('Full name');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('Address 1');
  const [address2, setAddress2] = useState('Address 2');
  const [city, setCity] = useState('City');
  const [state, setState] = useState('State');
  const [zip, setZip] = useState('ZIP Code');

  useEffect(() => {
    const LoadData = async () => {
      try {
        const Response = await fetch(`http://localhost:3001/user/profileinfo/${user.username}`);

        const UserData = await Response.json();

        if (UserData.userExists !== "false") {
                  
          const FullNameArray = UserData.FullName.split(" ");

          setFirstName(FullNameArray[0]);
          setLastName(FullNameArray[1]);
          setAddress1(UserData.Address1);
          setAddress2(UserData.Address2);
          setCity(UserData.City);
          setState(UserData.State);
          setZip(UserData.Zip);
        }

      } catch (Error) {
        console.log(Error);
      }
    }

    LoadData();

  }, []);

  return (
    <>
      <div className='profile-page'>
        <div className="container">
          <h4 id="profile-info" className="m-5"> Profile Information </h4>

          <div className="d-flex justify-content-around mt-5 mx-5">
            <div className="col-6">
              <InfoBox title="Name" name="info-container" x={50} y={50}>
                <p> {firstName} {lastName} </p>
              </InfoBox>
            </div>
            <div className="col-6">
              <InfoBox title="Address" name="info-container" x={50} y={135}>
                <div className="d-flex flex-row">
                  <p className="pr-4" > {address1} </p>
                  <p > {address2} </p>
                </div>
              </InfoBox>
            </div>
          </div>

          <div className="d-flex justify-content-between m-5">
            <div className="col-3">
              <InfoBox title="City" name="info-container" x={50} y={240}>
                <p> {city} </p>
              </InfoBox>
            </div>
            <div className="col-3">
              <InfoBox title="State" name="info-container" x={50} y={325}>
                <p> {state} </p>
              </InfoBox>
            </div>
            <div className="col-3">
              <InfoBox title="Zipcode" name="info-container" x={50} y={240}>
                <p> {zip} </p>
              </InfoBox>
            </div>
          </div>

          <div className="text-center">
            <ProfileModal setFirstName={setFirstName} setLastName={setLastName} setAddress1={setAddress1}
            setAddress2={setAddress2} setCity={setCity} setState={setState} setZip={setZip}
            /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
