import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { jwtDecode } from "jwt-decode";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


import type {
  Usuario,
  JwtPayload,
  AuthContextData,
  AuthProviderProps,
} from "../types/auth.types";
import { api, setAccessToken } from "../services/api";

const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: AuthProviderProps) {

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  const [tokenExpirado, setTokenExpirado] =
    useState(false);

  const timeoutRef =
    useRef<number | null>(null);

  async function renovarToken() {
    try {
      const response =
        await api.post(
          "/usuarios/refresh",
          {},
          {
            withCredentials: true,
          }
        );
      const novoToken =
        response.data.accessToken;
      setAccessToken(
        novoToken
      );

      const decoded =
        jwtDecode<JwtPayload>(
          novoToken
        );

      setToken(
        novoToken
      );

      setUsuario({
        id: decoded.id,
        nome: decoded.nome,
        email: decoded.sub,
        token: novoToken,
      });

    } catch (error) {

      console.error(
        "Erro refresh:",
        error
      );

      setToken(null);
      setUsuario(null);

    } finally {

      setCarregando(false);
    }
  }

  useEffect(() => {
    renovarToken();
  }, []);

  const login = (
    novoToken: string
  ): void => {
    const decoded =
      jwtDecode<JwtPayload>(
        novoToken
      );
    setAccessToken(
      novoToken
    );
    setToken(
      novoToken
    );
    setUsuario({
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.sub,
      token: novoToken,
    });
  };

  const logout = (): void => {
    setAccessToken(null);
    setToken(null);
    setUsuario(null);
  };

  useEffect(() => {
    const handleLogout = () => {
      setTokenExpirado(true);
    };
    window.addEventListener(
      "logout",
      handleLogout
    );
    return () => {
      window.removeEventListener(
        "logout",
        handleLogout
      );
    };
  }, []);

  useEffect(() => {
    if (!usuario)
      return;
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }
      timeoutRef.current =
        window.setTimeout(
          () => {
            logout();
          },
          2 * 60 * 1000
        );

    };
    const eventos = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    eventos.forEach(evento =>
      window.addEventListener(
        evento,
        resetTimer
      )
    );
    resetTimer();
    return () => {
      eventos.forEach(evento =>
        window.removeEventListener(
          evento,
          resetTimer
        )
      );
      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, [usuario]);
  const confirmarLogoutPorExpiracao =
    (): void => {
      setTokenExpirado(false);
      logout();
      window.location.href =
        "/";
    };
  return (
    <>
      <AuthContext.Provider
        value={{
          usuario,
          token,
          carregando,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
      <AlertDialog open={tokenExpirado}
      >
        <AlertDialogContent
          className="
          bg-black
          text-white
          border
          border-white
          "
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Sessão expirada
            </AlertDialogTitle>
            <AlertDialogDescription>
              Seu token expirou.
              Faça login novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={
                confirmarLogoutPorExpiracao
              }
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const useAuth =
  (): AuthContextData => {
    const context =
      useContext(
        AuthContext
      );
    if (!context) {
      throw new Error(
        "useAuth deve ser utilizado dentro de um AuthProvider"
      );
    }
    return context;
  };