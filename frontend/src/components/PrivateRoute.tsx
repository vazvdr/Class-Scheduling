import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../data/contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({
  children,
}: PrivateRouteProps) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <div className="text-white text-center mt-10">Carregando...</div>;
  }

  return usuario ? <>{children}</> : <Navigate to="/entrar" replace />;
}