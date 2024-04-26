import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import '../styles/SignUpLogin.css'
import { useAuth } from "../contexts/AuthContext";

const ReturnURL = (Data, URL) => {
  URL += "?";

  Object.keys(Data).forEach(Key => {
    URL += Key.toString() + "=" + Data[Key].toString() + "&";
  })

  URL = URL.substring(0, URL.length - 1);
  
  return URL;
}

const CheckDataExists = async (Data, URL) => {
  URL = ReturnURL(Data, URL);

  try {
    const Response = await fetch(URL);
    const Data = await Response.text();
    const ParsedData = JSON.parse(Data);

    if (ParsedData.found === "true") {
      console.log(Response);
      return {UsernameExists: true, Username: ParsedData.username};
    } 

    return {UsernameExists: false, Username: ParsedData.username};

  } catch (error) {
    throw new Error(error);
  }
}

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formdata, setFormData] = useState({ username: '', password: ''});
  const [ShouldRedirect, SetShouldRedirect] = useState(false);
  const [SubmitText, SetSubmitText] = useState("");

  if(isAuthenticated){
    return <Navigate to="/user" />
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formdata, [name]: value});
  }

  const HandleSubmit = async (Event) => {
    Event.preventDefault();

    const ResponseObject = await CheckDataExists({username: formdata.username}, "http://localhost:3001/finduser");

    if (ResponseObject.UsernameExists === false) {
      console.log("Account does not exist");

      SetSubmitText("Invalid username or password");
    } else {
      console.log("Account does exist");

      const PasswordMatches = await login(formdata);

      if (PasswordMatches === true) {
        console.log("Logging in");
        SetShouldRedirect(true);
      } else {
        console.log("Wrong password");
        SetShouldRedirect(false);
        
        SetSubmitText("Invalid username or password");
      }
    }
  }

  return (
    <Fragment>
      {ShouldRedirect && <Navigate to="/user"/>}
      <div className="main-content">
        <div className="login-card">
          <h2 className="login-header">Login Here</h2>

          <form id="loginForm">
            <div className="form-group">
              <label for="username">Username</label>
              <input onChange={handleInputChange} value={formdata.username} type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input onChange={handleInputChange} value={formdata.password} type="password" id="password" name="password" required />
            </div>
            <div className="form-actions">
              <button onClick={HandleSubmit} type="submit" className="btn-signup">Log In</button>
            </div>
            <div className="links-container">
              <Link to="/signup">Need to create an account? Sign Up</Link>
            </div>
          </form>
        </div>
      </div>

      <p id="submit-text"> {SubmitText} </p>
    </Fragment>
  );
};

export default Login;
