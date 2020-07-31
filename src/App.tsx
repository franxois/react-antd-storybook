import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SessionProvider } from "./contexts/Session";
import Ui from "./routes/ui";
import "./App.less";

const App = () => (
  <SessionProvider>
    <Router>
      <Routes>
        <Route path="/ui">
          <Ui />
        </Route>
        <Route path="/">
          <Navigate to="/ui"></Navigate>
        </Route>
      </Routes>
    </Router>
  </SessionProvider>
);

export default App;
