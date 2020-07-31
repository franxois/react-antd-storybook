import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SessionProvider } from "./contexts/Session";
import Ui from "./routes/Ui";
import { Login } from "./routes/Login";
import { PrivateRoute } from "./components/PrivateRoute";

import "./App.less";

const App = () => (
  <SessionProvider>
    <Router>
      <Routes>
        <PrivateRoute path="/ui">
          <Ui />
        </PrivateRoute>
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
