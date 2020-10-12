import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SessionProvider } from "./contexts/Session";
import { UsersProvider } from "./contexts/UsersStore";
import "./App.less";
import Spin from "antd/lib/spin";

const Ui = React.lazy(() => import("./routes/Ui"));
const Login = React.lazy(() => import("./routes/Login"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));

const App = () => (
  <Suspense fallback={<Spin className="center" tip="Loading..." />}>
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
  </Suspense>
);

export default App;
