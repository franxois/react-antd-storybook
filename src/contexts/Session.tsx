import React, { useReducer, useContext } from "react";

interface Session {
  loggedIn: boolean;
  username: string;
}

const initialSession = { loggedIn: false, username: "" };

type SessionActions = { type: "loginAsAdmin" } | { type: "logoff" };

const SessionCtx = React.createContext<{
  session: Session;
  dispatch: React.Dispatch<SessionActions>;
}>({ session: initialSession, dispatch: () => {} });

export const SessionProvider: React.FC = ({ children }) => {
  const [session, dispatch] = useReducer(
    (session: Session, action: SessionActions) => {
      switch (action.type) {
        case "loginAsAdmin":
          return { ...session, loggedIn: true, username: "admin" };
        case "logoff":
          return { ...session, loggedIn: false, username: "" };
        default:
          throw new Error();
      }
    },
    initialSession
  );

  return (
    <SessionCtx.Provider value={{ session, dispatch }}>
      {children}
    </SessionCtx.Provider>
  );
};

export const useSession = () => useContext(SessionCtx);
