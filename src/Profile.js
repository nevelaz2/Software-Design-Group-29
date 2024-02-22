import React from 'react';
import './App.css';
import "./Profile.css";

function InfoBox(Props) {
  let containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    
    position: "absolute",
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
  return (
    <>
      <h1 id="profile-info"> Profile Information </h1>
      <div className='profile-page'>
        <div className="container">
          <InfoBox title="Name" name="info-container" x={50} y={50}>
            <p> Name Placeholder </p>
          </InfoBox>

          <InfoBox title="Address" name="info-container" x={50} y={135}>
            <p> Address Placeholder </p>
            <p> Country Placeholder </p>
          </InfoBox>

          <InfoBox title="Username" name="info-container" x={50} y={240}>
            <p> Your Username Placeholder </p>
          </InfoBox>

          <InfoBox title="Password" name="info-container" x={50} y={325}>
            <p> Password Placeholder </p>
          </InfoBox>
        </div>

        <button className="button"> Edit </button>
      </div>
    </>
  );
};

export default Profile;
