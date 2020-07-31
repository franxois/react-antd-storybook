import React, { useReducer, useContext } from "react";

interface Session {
  loggedIn: boolean;
}

const initialSession = { loggedIn: false };

type SessionActions = { type: "login" } | { type: "logoff" };

const SessionCtx = React.createContext<{
  session: Session;
  dispatch: React.Dispatch<SessionActions>;
}>({ session: initialSession, dispatch: () => {} });

export const SessionProvider: React.FC = ({ children }) => {
  const [session, dispatch] = useReducer(
    (session: Session, action: SessionActions) => {
      switch (action.type) {
        case "login":
          return { ...session, loggedIn: true };
        case "logoff":
          return { ...session, loggedIn: false };
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
