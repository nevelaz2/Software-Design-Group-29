import React, { Fragment } from "react";
import "../styles/SignUpLogin.css";

const SignUp = () => {
  return (
    <Fragment>
      <div class="main-content">
        <div class="login-card">
          <h2 class="login-header">Create Account Here</h2>

          <form id="loginForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-signup">Sign Up</button>
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
