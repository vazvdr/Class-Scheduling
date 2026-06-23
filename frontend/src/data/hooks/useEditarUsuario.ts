import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUsuario } from "./useUsuario";
import { useAuth } from "../contexts/AuthContext";

import type {
  EditarUsuarioFormData,
  EditarUsuarioAlert,
} from "../types/editar-usuario.types";

export function useEditarUsuario() {
  const navigate = useNavigate();

  const {
    usuario,
  } = useAuth();

  const { editar, deletar } = useUsuario();

  const [loadingAtualizar, setLoadingAtualizar] =
    useState(false);

  const [confirmarExclusao, setConfirmarExclusao] =
    useState(false);

  const [alerta, setAlerta] =
    useState<EditarUsuarioAlert>({
      visivel: false,
      titulo: "",
      descricao: "",
    });

  const form =
    useForm<EditarUsuarioFormData>({
      defaultValues: {
        nome: "",
        email: "",
        telefone: "",
        senha: "",
      },
    });

  const { setValue } = form;

  useEffect(() => {

    if (!usuario) {
      navigate("/entrar");
      return;
    }

    setValue(
      "nome",
      usuario.nome || ""
    );

    setValue(
      "email",
      usuario.email || ""
    );

    setValue(
      "telefone",
      ""
    );

  }, [
    usuario,
    navigate,
    setValue,
  ]);


  const onSubmit =
    async (
      data: EditarUsuarioFormData
    ): Promise<void> => {

      setLoadingAtualizar(true);

      await editar({
        ...data,

        onSuccess: () => {

          setAlerta({
            visivel: true,
            titulo:
              "Seus dados foram atualizados com sucesso! ✅",
            descricao:
              "Você será redirecionado para a página inicial!",
          });

          setLoadingAtualizar(false);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        },
      });
    };


  const handleDeletar =
    (): void => {
      setConfirmarExclusao(true);
    };


  const confirmarDelete =
    async (): Promise<void> => {

      await deletar();

      setConfirmarExclusao(false);

      setAlerta({
        visivel: true,
        titulo:
          "Sua conta foi excluída com sucesso! ✅",
        descricao:
          "Você será redirecionado para a página inicial!",
      });

      setTimeout(() => {
        navigate("/");
      }, 4000);
    };


  return {
    form,
    alerta,
    loadingAtualizar,
    confirmarExclusao,
    setConfirmarExclusao,
    handleDeletar,
    confirmarDelete,
    onSubmit,
  };
}