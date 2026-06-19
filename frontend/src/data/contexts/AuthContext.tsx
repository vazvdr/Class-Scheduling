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

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [carregando, setCarregando] = useState(true);

  const [tokenExpirado, setTokenExpirado] =
    useState(false);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");

    if (tokenSalvo) {
      try {
        const decoded =
          jwtDecode<JwtPayload>(tokenSalvo);

        setToken(tokenSalvo);

        setUsuario({
          nome: decoded.nome,
          email: decoded.sub,
          token: tokenSalvo,
        });
      } catch (error) {
        console.error(
          "Erro ao decodificar token:",
          error
        );

        localStorage.removeItem("token");
      }
    }

    setCarregando(false);
  }, []);

  const login = (token: string): void => {
    localStorage.setItem("token", token);

    const decoded =
      jwtDecode<JwtPayload>(token);

    setToken(token);

    setUsuario({
      nome: decoded.nome,
      email: decoded.sub,
      token,
    });
  };

  const logout = (): void => {
    localStorage.removeItem("token");

    setToken(null);
    setUsuario(null);
  };

  useEffect(() => {
    const handleLogout = () => {
      console.log(
        "Evento de logout recebido do interceptor"
      );
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
    if (!usuario) return;

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current =
        window.setTimeout(() => {
          console.log(
            "Logout sendo feito por inatividade"
          );

          logout();
        }, 2 * 60 * 1000);
    };

    const eventos = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    eventos.forEach((evento) =>
      window.addEventListener(
        evento,
        resetTimer
      )
    );

    resetTimer();

    return () => {
      eventos.forEach((evento) =>
        window.removeEventListener(
          evento,
          resetTimer
        )
      );

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [usuario]);

  const confirmarLogoutPorExpiracao =
    (): void => {
      console.log(
        "Logout confirmado pelo usuário"
      );
      setTokenExpirado(false);
      logout();
      window.location.href = "/";
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

      <AlertDialog
        open={tokenExpirado}
      >
        <AlertDialogContent className="bg-black text-white border border-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Sessão expirada
            </AlertDialogTitle>

            <AlertDialogDescription>
              Seu token de login expirou. Faça login
              novamente para continuar
              utilizando a plataforma.
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
      useContext(AuthContext);

    if (!context) {
      throw new Error(
        "useAuth deve ser utilizado dentro de um AuthProvider"
      );
    }

    return context;
  };