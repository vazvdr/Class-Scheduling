import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { redefinirSenha } from "../services/usuarioService";

import type {
  RedefinirSenhaAlertData,
  RedefinirSenhaFormData,
} from "../types/redefinir-senha.types";

export function useRedefinirSenha(token: string | null) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [alerta, setAlerta] =
    useState<RedefinirSenhaAlertData>({
      visivel: false,
      tipo: "default",
      titulo: "",
      descricao: "",
    });

  const form =
    useForm<RedefinirSenhaFormData>({
      defaultValues: {
        novaSenha: "",
        confirmarSenha: "",
      },
    });

  useEffect(() => {
    if (!token) {
      setAlerta({
        visivel: true,
        tipo: "destructive",
        titulo: "Token inválido ou ausente",
        descricao:
          "O link de redefinição está incorreto ou expirado.",
      });
    }
  }, [token]);

  const handleRedefinirSenha = async (
    data: RedefinirSenhaFormData
  ): Promise<void> => {
    if (data.novaSenha !== data.confirmarSenha) {
      setAlerta({
        visivel: true,
        tipo: "destructive",
        titulo: "Senhas diferentes",
        descricao: "As senhas não coincidem.",
      });

      return;
    }

    setLoading(true);

    try {
      const redefinir =
        (window as any)?.__mockRedefinirSenha__ ||
        redefinirSenha;

      await redefinir({
        token,
        novaSenha: data.novaSenha,
      });

      setAlerta({
        visivel: true,
        tipo: "default",
        titulo: "Senha atualizada com sucesso ✅",
        descricao:
          "Agora você pode fazer login com sua nova senha.",
      });

      setTimeout(() => {
        navigate("/entrar");
      }, 3000);
    } catch (error: any) {
      setAlerta({
        visivel: true,
        tipo: "destructive",
        titulo: "Erro na redefinição ❌",
        descricao:
          error?.message ||
          "Token expirado ou inválido.",
      });
    }

    setLoading(false);
  };

  return {
    form,
    alerta,
    loading,
    handleRedefinirSenha,
  };
}