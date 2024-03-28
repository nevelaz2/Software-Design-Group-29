import React from 'react';
import '../styles/App.css';
import '../styles/Profile.css';

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
  return (
    <>
      <div className='profile-page'>
        <div className="container">
          <h4 id="profile-info" className="m-5 lead"> Profile Information </h4>

          <div className="d-flex justify-content-around mt-5 mx-5">
            <div className="col-6">
              <InfoBox title="Name" name="info-container" x={50} y={50}>
                <p> Full name </p>
              </InfoBox>
            </div>
            <div className="col-6">
              <InfoBox title="Address" name="info-container" x={50} y={135}>
                <div className="d-flex flex-row">
                  <p className="pr-4" > Address 1 </p>
                  <p > Address 2 </p>
                </div>
              </InfoBox>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5 mx-5">
            <div className="col-3">
              <InfoBox title="City" name="info-container" x={50} y={240}>
                <p> City </p>
              </InfoBox>
            </div>
            <div className="col-3">
              <InfoBox title="State" name="info-container" x={50} y={325}>
                <p> State </p>
              </InfoBox>
            </div>
            <div className="col-3">
              <InfoBox title="Zipcode" name="info-container" x={50} y={240}>
                <p> ZIP Code </p>
              </InfoBox>
            </div>
          </div>
      
        </div>

        <button className="button"> Edit </button>
      </div>
    </>
  );
};

export default Profile;
