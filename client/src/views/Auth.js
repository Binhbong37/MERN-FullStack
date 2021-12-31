import React from "react";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authRouter }) => {
  let body;
  body = (
    <>
      {authRouter === "login" && <LoginForm />}
      {authRouter === "register" && <RegisterForm />}
    </>
  );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIT</h1>
          <h4>Keep track of . . . </h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
