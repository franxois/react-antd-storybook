import React, { useReducer, useContext } from "react";

export interface User {
  firstName: string;
  lastName: string;
}
type Users = User[];

const initialSession: User[] = [];

type UsersStoreActions = { type: "add"; user: User };

const UsersCtx = React.createContext<{
  users: Users;
  dispatch: React.Dispatch<UsersStoreActions>;
}>({ users: initialSession, dispatch: () => {} });

export const UsersProvider: React.FC = ({ children }) => {
  const [users, dispatch] = useReducer(
    (users: Users, action: UsersStoreActions) => {
      switch (action.type) {
        case "add":
          return [...users, { ...action.user }];
      }
    },
    initialSession
  );

  return (
    <UsersCtx.Provider value={{ users, dispatch }}>
      {children}
    </UsersCtx.Provider>
  );
};

export const useUsers = () => useContext(UsersCtx);
