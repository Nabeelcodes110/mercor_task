import React from "react";
import { auth, provider } from "../utils/config";
import { signInWithPopup } from "firebase/auth";

function Signup() {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
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
