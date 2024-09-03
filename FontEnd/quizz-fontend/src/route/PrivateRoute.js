import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return <>{isAuth ? props.children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
