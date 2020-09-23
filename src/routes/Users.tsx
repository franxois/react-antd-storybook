import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const UsersList = () => {
  return (
    <div>
      <Link to="new">Add</Link> None
    </div>
  );
};
const UsersCreate = () => <div>Ok why not</div>;
const UsersView = () => <div>user</div>;
const UsersEdit = () => <div>edit user</div>;

export default function Users() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />}></Route>
      <Route path="new" element={<UsersCreate />}></Route>
      <Route path=":isUser">
        <Route path="/" element={<UsersView />} />
        <Route path="edit" element={<UsersEdit />} />
      </Route>
    </Routes>
  );
}
