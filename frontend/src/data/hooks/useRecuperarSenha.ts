import { useState } from "react";
import { useForm } from "react-hook-form";

import { enviarLinkRecuperacaoSenha }
  from "../services/usuarioService";

import type {
  RecuperarSenhaAlertData,
  RecuperarSenhaFormData,
} from "../types/recuperar-senha.types";

export function useRecuperarSenha() {
  const [loading, setLoading] = useState(false);

  const [bloqueado, setBloqueado] =
    useState(false);

  const [alerta, setAlerta] =
    useState<RecuperarSenhaAlertData>({
      visivel: false,
      tipo: "default",
      titulo: "",
      descricao: "",
    });

  const form =
    useForm<RecuperarSenhaFormData>({
      defaultValues: {
        email: "",
      },
    });

  const handleEnviar = async (
    data: RecuperarSenhaFormData
  ): Promise<void> => {
    setLoading(true);
    setBloqueado(true);

    const resultado =
      await enviarLinkRecuperacaoSenha(
        data.email
      );

    setAlerta({
      visivel: true,
      tipo: resultado.sucesso
        ? "default"
        : "destructive",
      titulo: resultado.sucesso
        ? "Email enviado com sucesso ✅"
        : "Erro ao enviar o email ❌",
      descricao: resultado.mensagem,
    });

    setTimeout(() => {
      setAlerta((prev) => ({
        ...prev,
        visivel: false,
      }));
    }, 4000);

    setLoading(false);
  };

  return {
    form,
    alerta,
    loading,
    bloqueado,
    handleEnviar,
  };
}