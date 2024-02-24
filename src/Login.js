import React, { Fragment } from "react";
import './SignUpLogin.css'

const Login = () => {
  return (
    <Fragment>
      <div className="main-content">
        <div className="login-card">
          <h2 className="login-header">Login Here</h2>

          <form id="loginForm">
            <div className="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-signup">Log In</button>
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
