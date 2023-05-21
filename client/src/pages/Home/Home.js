import React from "react";
import "./Home.css";
import { auth, provider, firestore } from "../../utils/config";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";

const Home = () => {
  const [user] = useAuthState(auth);
  const collectionRef = collection(firestore, "Users");

  //signIn / Login
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setDoc(doc(collectionRef, data.user.uid), {
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
        uid: data.user.uid,
        email: data.user.email,
      })
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
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
