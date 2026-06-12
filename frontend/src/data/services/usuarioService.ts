import axios, { AxiosError } from "axios";

const API = "https:/class-scheduling.up.railway.app/usuarios";

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
  token: string;
  usuario: {
    nome?: string;
    email?: string;
    token?: string;
  };
}

export const loginUsuario = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API}/login`, payload);
  return res.data;
};

export const cadastrarUsuario = async (
  payload: UsuarioPayload
): Promise<unknown> => {
  const res = await axios.post(`${API}/cadastrar`, payload);
  return res.data;
};

export const editarUsuario = async (
  payload: UsuarioPayload
): Promise<unknown> => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${API}/editar`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deletarUsuario = async (): Promise<unknown> => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API}/deletar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const enviarLinkRecuperacaoSenha = async (
  email: string
): Promise<RecuperacaoResponse> => {
  try {
    await axios.post(`${API}/recuperar-senha`, {
      email,
    });

    return {
      sucesso: true,
      mensagem: "Verifique sua caixa de entrada ou spam!",
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
    const response = await axios.post(`${API}/redefinir-senha`, {
      token,
      novaSenha,
    });

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