import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { DispatchContext } from "./UserDataContext";
import { User } from "firebase/auth";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

export const AuthContext = React.createContext<User | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const dispatch = useContext(DispatchContext);

  const setUserData = async (id: string) => {
    let error;
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef).catch(() => {
      error = true;
    });
    const payload = docSnap?.data();

    if (payload) {
      dispatch({ type: "UPDATE-SAVED-USER", payload: payload });
      dispatch({ type: "SIGN-IN-SUCCESS" });
    } else if (!error) {
      dispatch({ type: "SIGN-UP" });
    }

    setPending(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setPending(false);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser.uid);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  if (pending) {
    return <LoadingScreen />;
  }
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
