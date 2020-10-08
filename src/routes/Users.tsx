import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { User, useUsers } from "../contexts/UsersStore";
import { Input, Button } from "antd";

import "./Users.less";

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

const usersFields = [
  { label: "First Name", name: "firstName", placeholder: "John", as: Input },
  { label: "Last Name", name: "lastName", placeholder: "Doe", as: Input },
];

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
        {usersFields.map(ToField)}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

function disableField<U>(field: U): U & { disabled: "disabled" } {
  return { ...field, disabled: "disabled" };
}

const ToField = ({
  label,
  name,
  placeholder,
  disabled,
  as,
}: {
  label: string;
  name: string;
  placeholder: string;
  disabled?: "disabled";
  as: React.ComponentType;
}) => {
  return (
    <Fragment key={name}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} {...{ placeholder, name, disabled, as }} />
      <ErrorMessage name={name} />
    </Fragment>
  );
};

const UsersView = () => {
  const { idUser } = useParams();
  const userStore = useUsers();

  return (
    <div>
      view user #{idUser}
      <Formik<User>
        initialValues={{
          ...userStore.users[parseInt(idUser)],
        }}
        onSubmit={() => {}}
      >
        <Form>{usersFields.map(disableField).map(ToField)}</Form>
      </Formik>
    </div>
  );
};
const UsersEdit = () => {
  const { idUser } = useParams();
  const userStore = useUsers();
  const navigate = useNavigate();

  return (
    <Formik<User>
      initialValues={{
        ...userStore.users[parseInt(idUser)],
      }}
      onSubmit={(values) => {
        userStore.dispatch({
          type: "edit",
          idUser: parseInt(idUser),
          user: values,
        });
        navigate(-1);
      }}
    >
      <Form>
        {usersFields.map(ToField)}
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form>
    </Formik>
  );
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
