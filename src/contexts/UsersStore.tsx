import React, { useReducer, useContext } from "react";

export interface User {
  firstName: string;
  lastName: string;
}
type UsersList = User[];

const initialSession: UsersList = [];

type UsersStoreActions =
  | { type: "add"; user: User }
  | { type: "edit"; idUser: number; user: User };

const usersStoreReducer = (users: UsersList, action: UsersStoreActions) => {
  switch (action.type) {
    case "add":
      return [...users, { ...action.user }];
    case "edit":
      const newList = [...users];
      newList[action.idUser] = { ...action.user };
      return newList;
  }
};

const UsersCtx = React.createContext<{
  users: UsersList;
  dispatch: React.Dispatch<UsersStoreActions>;
}>({ users: initialSession, dispatch: () => {} });

export const UsersProvider: React.FC = ({ children }) => {
  const [users, dispatch] = useReducer(usersStoreReducer, initialSession);
  return (
    <UsersCtx.Provider value={{ users, dispatch }}>
      {children}
    </UsersCtx.Provider>
  );
};

export const useUsers = () => useContext(UsersCtx);
