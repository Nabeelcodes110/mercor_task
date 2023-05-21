import React from "react";
import "./Home.css";
import { auth, provider } from "../../utils/config";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [user] = useAuthState(auth);

  //signIn / Login
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log("SignedIn");
    });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="home-container">
      {user ? (
        <>
          <div className="hero">
            <h1>Welcome to the Chat App</h1>
          </div>
          <div className="button-container">
            <Link to="/users">
              <button className="button">All Users</button>
            </Link>
            <Link to="/groups">
              <button className="button">Create/Join Rooms</button>
            </Link>
          </div>
          <br></br>

          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="hero">
            <h1>Welcome to the Chat App</h1>
          </div>
          <button className="button" onClick={handleLogin}>
            Continue with Google
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
