import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const RegistrationPage = () => {
  const { pagename } = useParams();
  const [livePageName, setLivePageName] = useState(pagename);

  useEffect(() => {
    setLivePageName(pagename);
  }, [pagename]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {livePageName === "login" ? <LoginPage /> : <SignupPage />}
    </div>
  );
};

export default RegistrationPage;
