import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        window.location.reload();
        res();
      });
    },
  };
}

export function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return sessionStorage.getItem("email") &&
    sessionStorage.getItem("password") ? (
    children
  ) : (
    <Navigate to="/panel/home" replace state={{ path: location.pathname }} />
  );
}

export async function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
