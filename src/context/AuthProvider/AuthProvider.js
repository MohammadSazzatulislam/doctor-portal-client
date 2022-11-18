import React, { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import './AuthProvider.css';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  
const toggleTheme = () => {
  if (theme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
useEffect(() => {
  document.body.className = theme;
}, [theme]);





  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
    };
    
    // profile name update 
    const userNameUpdate = userName => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName :userName});
    }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // sign out
  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };







  const authInfo = {
    createUser,
    user,
    signInUser,
    userSignOut,
    setLoading,
    loading,
    userNameUpdate,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
