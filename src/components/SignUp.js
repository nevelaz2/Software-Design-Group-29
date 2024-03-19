import React, { Fragment } from "react";
import { useRef } from "react";
import "../styles/SignUpLogin.css";

const CheckDataExists = async (Data, URL) => {
  URL += "?";

  Object.keys(Data).forEach(Key => {
    URL += Key.toString() + "=" + Data[Key].toString() + "&";
  })

  URL = URL.substring(0, URL.length - 1);

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

const CreateNewData = async (Data, URL) => {
  const RequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Data)
  }

  try {
    const Response = await fetch(URL, RequestOptions);
    const Data = await Response.text();

    console.log(Data);

  } catch (error) {
    throw new Error(error);
  }
}

const SignUp = () => {
  const Username = useRef(null);
  const Password = useRef(null);

  const HandleSignUp = async (Event) => {
    Event.preventDefault();

    const ResponseObject = await CheckDataExists({username: Username.current.value}, "http://localhost:3001/finduser");

    if (ResponseObject.UsernameExists === false) {
      CreateNewData({
        userId: null, 
        username: Username.current.value, 
        password: Password.current.value}, 
        "http://localhost:3001/createuserdata");
    } else {
      console.log("This username already exists");
    }
  }

  return (
    <Fragment>
      <div class="main-content">
        <div class="login-card">
          <h2 class="login-header">Create Account Here</h2>

          <form id="loginForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input ref={Username} type="text" id="username" name="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input ref={Password} type="password" id="password" name="password" required />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-signup" onClick={HandleSignUp}>Sign Up</button>
            </div>
            <div class="links-container">
              <a href="login.html" class="signin-account">Already have an account? Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
