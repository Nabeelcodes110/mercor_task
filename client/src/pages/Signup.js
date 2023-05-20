import React from "react";
import { auth, provider } from "../utils/config";
import { signInWithPopup } from "firebase/auth";

function Signup(props) {
  const { token, setToken } = props;
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setToken(token);
      sessionStorage.setItem("token", data.user.accessToken);
      console.log(data);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Signin in with Google</button>
    </div>
  );
}

export default Signup;
