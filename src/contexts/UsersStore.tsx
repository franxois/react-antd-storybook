import React, { useReducer, useContext, useEffect } from "react";

export interface User {
  firstName: string;
  lastName: string;
}
type UsersList = User[];

const LOCAL_STORAGE_USERS_LIST_KEY = "users-list";
const initialUsersList: UsersList = [];

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
}>({ users: initialUsersList, dispatch: () => {} });

export const UsersProvider: React.FC = ({ children }) => {
  const [users, dispatch] = useReducer(
    usersStoreReducer,
    initialUsersList,
    (initialUsersList) => {
      const persisted = localStorage.getItem(LOCAL_STORAGE_USERS_LIST_KEY);
      if (persisted !== null) {
        const p2 = JSON.parse(persisted);
        return p2;
      }
      return initialUsersList;
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USERS_LIST_KEY, JSON.stringify(users));
  }, [users]);

  return (
    <UsersCtx.Provider value={{ users, dispatch }}>
      {children}
    </UsersCtx.Provider>
  );
};

export const useUsers = () => useContext(UsersCtx);
