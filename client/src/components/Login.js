import React, { Fragment } from "react";
import { useRef } from "react";
import '../styles/SignUpLogin.css'

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

    return {UsernameExists: false};

  } catch (error) {
    throw new Error(error);
  }
}

const ComparePassword = async (Data) => {
  try {
    const URL = ReturnURL(Data, "http://localhost:3001/compare-password");

    const Response = await fetch(URL);
    const PasswordMatches = await Response.text();

    if (PasswordMatches === "true") {
      return true;
    }

    return false;

  } catch (Error) {
    throw new Error(Error);
  }
}

const Login = () => {
  const Username = useRef(null);
  const Password = useRef(null);

  const HandleSubmit = async (Event) => {
    Event.preventDefault();

    const ResponseObject = await CheckDataExists({username: Username.current.value}, "http://localhost:3001/finduser");

    if (ResponseObject.UsernameExists === false) {
      console.log("Account does not exist");
    } else {
      console.log("Account does exist");

      const PasswordMatches = await ComparePassword({username: ResponseObject.Username, password: Password.current.value});

      if (PasswordMatches === true) {
        console.log("Logging in");
      } else {
        console.log("Wrong password");
      }
    }
  }

  return (
    <Fragment>
      <div className="main-content">
        <div className="login-card">
          <h2 className="login-header">Login Here</h2>

          <form id="loginForm">
            <div className="form-group">
              <label for="username">Username</label>
              <input ref={Username} type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input ref={Password} type="password" id="password" name="password" required />
            </div>
            <div className="form-actions">
              <button onClick={HandleSubmit} type="submit" className="btn-signup">Log In</button>
            </div>
            <div className="links-container">
              <a href="signup.html" className="signin-account">Need to create an account? Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
