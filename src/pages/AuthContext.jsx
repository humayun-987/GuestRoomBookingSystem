import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext(null);

const ROLE_COLLECTIONS = {
  student:   "users_student",
  warden:    "users_warden",
  caretaker: "users_caretaker",
  admin:     "users_admin",
};

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null); setProfile(null); setRole(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      for (const [r, col] of Object.entries(ROLE_COLLECTIONS)) {
        const snap = await getDoc(doc(db, col, firebaseUser.uid));
        if (snap.exists()) {
          setRole(r);
          setProfile({ id: snap.id, ...snap.data() });
          setLoading(false);
          return;
        }
      }

      setRole(null);
      setProfile(null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Signs out and clears state — ProtectedRoute handles redirect to /login
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export const ROLE_HOME = {
  student:   "/student/dashboard",
  warden:    "/warden/dashboard",
  caretaker: "/caretaker/dashboard",
  admin:     "/admin/hostels",
};
