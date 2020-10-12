import React from "react";
import { Route, Navigate } from "react-router-dom";
import { RouteProps } from "react-router";
import { useSession } from "../contexts/Session";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { session } = useSession();
  return session.loggedIn ? <Route {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute
