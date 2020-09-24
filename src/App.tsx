import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SessionProvider } from "./contexts/Session";
import { UsersProvider } from "./contexts/UsersStore";
import Ui from "./routes/Ui";
import { Login } from "./routes/Login";
import { PrivateRoute } from "./components/PrivateRoute";

import "./App.less";

const App = () => (
  <SessionProvider>
    <Router>
      <Routes>
        <PrivateRoute
          path="/ui/*"
          element={
            <UsersProvider>
              <Ui />
            </UsersProvider>
          }
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Navigate to="/ui"></Navigate>
        </Route>
      </Routes>
    </Router>
  </SessionProvider>
);

export default App;
