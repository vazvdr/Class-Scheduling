import { AxiosError } from "axios";
import { api } from "./api";

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface UsuarioPayload {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export interface RedefinirSenhaPayload {
  token: string;
  novaSenha: string;
}

export interface RecuperacaoResponse {
  sucesso: boolean;
  mensagem: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const loginUsuario = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(
    "/usuarios/login",
    payload
  );

  return res.data;
};

export const cadastrarUsuario = async (
  payload: UsuarioPayload
): Promise<unknown> => {
  const res = await api.post(
    "/usuarios/cadastrar",
    payload
  );

  return res.data;
};

export const editarUsuario = async (
  payload: UsuarioPayload
): Promise<unknown> => {
  const res = await api.put(
    "/usuarios/editar",
    payload
  );

  return res.data;
};

export const deletarUsuario = async (): Promise<unknown> => {
  const res = await api.delete(
    "/usuarios/deletar"
  );

  return res.data;
};

export const enviarLinkRecuperacaoSenha = async (
  email: string
): Promise<RecuperacaoResponse> => {
  try {
    await api.post(
      "/usuarios/recuperar-senha",
      {
        email,
      }
    );

    return {
      sucesso: true,
      mensagem:
        "Verifique sua caixa de entrada ou spam!",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
    }>;

    const mensagem =
      axiosError.response?.data?.message ||
      "Esse email não está cadastrado ou houve um erro.";

    return {
      sucesso: false,
      mensagem,
    };
  }
};

export const redefinirSenha = async ({
  token,
  novaSenha,
}: RedefinirSenhaPayload): Promise<unknown> => {
  try {
    const response = await api.post(
      "/usuarios/redefinir-senha",
      {
        token,
        novaSenha,
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
    }>;

    throw (
      axiosError.response?.data || {
        message: "Erro ao redefinir a senha",
      }
    );
  }
};