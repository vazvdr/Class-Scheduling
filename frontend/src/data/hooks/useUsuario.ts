import { useState } from "react";
import {
  loginUsuario,
  cadastrarUsuario,
  editarUsuario,
  deletarUsuario,
} from "../services/usuarioService";
import { useAuth } from "../contexts/AuthContext";

interface LoginParams {
  email: string;
  senha: string;
}

interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

interface UsuarioComCallback extends UsuarioData {
  onSuccess?: () => void;
}

export function useUsuario() {
  const [loading, setLoading] = useState(false);

  const {
    login: loginContext,
    logout,
  } = useAuth();

  const login = async ({
    email,
    senha,
  }: LoginParams): Promise<void> => {
    try {
      const data = await loginUsuario({
        email,
        senha,
      });
      loginContext(data.accessToken);
    } catch (err) {
      throw err;
    }
  };

  const cadastrar = async ({
    nome,
    email,
    senha,
    telefone,
    onSuccess,
  }: UsuarioComCallback): Promise<void> => {
    try {
      setLoading(true);

      await cadastrarUsuario({
        nome,
        email,
        senha,
        telefone,
      });

      onSuccess?.();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editar = async ({
    nome,
    email,
    senha,
    telefone,
    onSuccess,
  }: UsuarioComCallback): Promise<void> => {
    try {
      await editarUsuario({
        nome,
        email,
        senha,
        telefone,
      });

      onSuccess?.();
    } catch (err) {
      throw err;
    }
  };

  const deletar = async (): Promise<void> => {
    try {
      await deletarUsuario();

      logout();
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    cadastrar,
    editar,
    deletar,
    loading,
  };
}