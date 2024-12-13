import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";

export const ProtectedRoute = () => {
  const { token } = useContext(SocketContext);

  if (!token) {
  }
  return token ? <Outlet /> : <Navigate to="/signin" />;
};
