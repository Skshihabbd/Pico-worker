import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

// import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import auth from "./firebase.config";
import useAxiosPublic from "../Hooks2/useAxiosPublic";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState(null);
  const provider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const axiosPublic = useAxiosPublic();
  const SignUp = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignIn = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  const githubSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, gitProvider);
  };

  const updateUser = (name, image) => {
    setLoader(true);

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("this is the current user info", currentUser);
          
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          console.log(res.data.token);
          
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            
            setUsers(currentUser);
            setLoader(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem("access-token");

        setUsers(currentUser);
        setLoader(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  const logOut = () => {
    signOut(auth);
    setLoader(true);
  };

  const allData = {
    SignUp,
    SignIn,
    users,
    logOut,
    updateUser,
    googleSignIn,
    githubSignIn,
    loader,
    setUsers,
    setLoader,
  };
  // const object = { shihab: "shihab12" };

  return (
    <authContext.Provider value={allData}>{children}</authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
