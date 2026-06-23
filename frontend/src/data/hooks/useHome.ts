import { useNavigate } from "react-router-dom";

import {
  useAuth,
} from "../contexts/AuthContext";

export function useHome() {
  const navigate =
    useNavigate();

  const {
    usuario,
  } = useAuth();

  const redirecionarAgendamento =
    (): void => {
      navigate(
        usuario
          ? "/agendamento"
          : "/entrar"
      );
    };

  return {
    usuario,
    redirecionarAgendamento,
  };
}