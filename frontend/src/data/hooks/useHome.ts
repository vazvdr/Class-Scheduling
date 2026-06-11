import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import type {
  UsuarioLogado,
} from "../types/home.types";

interface JwtPayload {
  nome: string;
  sub: string;
}

export function useHome() {
  const navigate = useNavigate();

  const [usuario, setUsuario] =
    useState<UsuarioLogado | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const decoded =
        jwtDecode<JwtPayload>(token);

      setUsuario({
        nome: decoded.nome,
        email: decoded.sub,
      });
    } catch (error) {
      console.error(
        "Erro ao decodificar token:",
        error
      );
    }
  }, []);

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