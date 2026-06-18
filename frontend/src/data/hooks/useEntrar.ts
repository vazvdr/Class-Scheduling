import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUsuario } from "./useUsuario";

import type {
  AlertaState,
  ApiError,
  EntrarFormData,
} from "../types/entrar.types";

export function useEntrar() {
  const navigate = useNavigate();

  const { login, cadastrar, loading } = useUsuario();

  const [isLogin, setIsLogin] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const [alerta, setAlerta] = useState<AlertaState>({
    visivel: false,
    tipo: "default",
    titulo: "",
    descricao: "",
  });

  const form = useForm<EntrarFormData>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
    },
  });

  const toggleForm = (): void => {
    setIsLogin((prev) => !prev);
  };

  const irParaRecuperarSenha = (): void => {
    navigate("/recuperar-senha");
  };

  const onSubmit = async (
    data: EntrarFormData
  ): Promise<void> => {
    try {
      if (isLogin) {
        setLoginLoading(true);

        await login({
          email: data.email,
          senha: data.senha,
        });

        setTimeout(() => {
          setAlerta((prev) => ({
            ...prev,
            visivel: false,
          }));

          navigate("/");
          setLoginLoading(false);
        }, 4000);

        return;
      }

      await cadastrar({
        ...data,
        onSuccess: () => {
          setIsLogin(true);

          setAlerta({
            visivel: true,
            tipo: "default",
            titulo: "Cadastro realizado com sucesso ✅",
            descricao: "Faça login para continuar.",
          });

          setTimeout(() => {
            setAlerta((prev) => ({
              ...prev,
              visivel: false,
            }));
          }, 3000);
        },
      });
    } catch (error) {
      const err = error as ApiError;

      const mensagemErro =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Erro desconhecido.";

      setAlerta({
        visivel: true,
        tipo: "destructive",
        titulo: "Erro ao autenticar",
        descricao: mensagemErro,
      });

      setLoginLoading(false);

      setTimeout(() => {
        setAlerta((prev) => ({
          ...prev,
          visivel: false,
        }));
      }, 3000);
    }
  };

  return {
    form,
    alerta,
    setAlerta,
    loading,
    isLogin,
    loginLoading,
    toggleForm,
    onSubmit,
    irParaRecuperarSenha,
  };
}