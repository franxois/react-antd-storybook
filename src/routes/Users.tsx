import { Formik, Form, Field } from "formik";
import React from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { User, useUsers } from "../contexts/UsersStore";

const UsersList = () => {
  const userStore = useUsers();

  return (
    <div>
      <Link to="new">Add</Link>
      {userStore.users.length > 0 ? (
        <ul>
          {userStore.users.map((user, idx) => (
            <li key={idx}>
              {user.firstName} {user.lastName} <Link to={`${idx}`}>view</Link>{" "}
              <Link to={`${idx}/edit`}>edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}
    </div>
  );
};
const UsersCreate = () => {
  const userStore = useUsers();
  const navigate = useNavigate();

  return (
    <Formik<User>
      initialValues={{
        firstName: "",
        lastName: "",
      }}
      onSubmit={(values) => {
        userStore.dispatch({ type: "add", user: values });
        navigate(-1);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="John" />
        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
const UsersView = () => {
  const { idUser } = useParams();
  return <div>view user #{idUser}</div>;
};
const UsersEdit = () => {
  const { idUser } = useParams();
  return <div>edit user #{idUser}</div>;
};

export default function Users() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />}></Route>
      <Route path="new" element={<UsersCreate />}></Route>
      <Route path=":idUser">
        <Route path="/" element={<UsersView />} />
        <Route path="edit" element={<UsersEdit />} />
      </Route>
    </Routes>
  );
}
