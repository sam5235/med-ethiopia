import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscrive = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docref = doc(db, "users", user.uid);
        getDoc(docref)
          .then((snap) => {
            const data = snap.data();
            console.log(data);
            if (!data || data.role === undefined) {
              // doesn't have a admin or health role
              console.info("success");
              setUser(user);
            } else {
              logout();
            }
            setIsLoading(false);
          })
          .catch((err) => {
            logout();
            console.log(err);
          });
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });
    return () => unsubscrive();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
