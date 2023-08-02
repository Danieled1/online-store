import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <>
      {isRegistering ? (
        <RegisterForm isRegistering={isRegistering} toggleForm={toggleForm} />
      ) : (
        <LoginForm isRegistering={isRegistering} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default AuthPage;
