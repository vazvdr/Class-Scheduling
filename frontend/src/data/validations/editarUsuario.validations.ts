import { RegisterOptions } from "react-hook-form";

import { EditarUsuarioFormData } from "../types/editar-usuario.types";

export const nomeValidation: RegisterOptions<
  EditarUsuarioFormData,
  "nome"
> = {
  required: "O nome é obrigatório",
  minLength: {
    value: 3,
    message: "O nome deve ter pelo menos 3 letras",
  },
};

export const emailValidation: RegisterOptions<
  EditarUsuarioFormData,
  "email"
> = {
  required: "O email é obrigatório",
  validate: (value: string) => {
    const formatoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const dominioValido =
      /@(gmail|hotmail|outlook|yahoo)\./.test(value);

    if (!formatoValido) {
      return "Digite um email válido";
    }

    if (!dominioValido) {
      return "Aceitamos apenas gmail, hotmail, outlook ou yahoo";
    }

    return true;
  },
};

export const telefoneValidation: RegisterOptions<
  EditarUsuarioFormData,
  "telefone"
> = {
  required: "O telefone é obrigatório",
  pattern: {
    value: /^\d{11}$/,
    message: "O telefone deve conter exatamente 11 números",
  },
};

export const senhaValidation: RegisterOptions<
  EditarUsuarioFormData,
  "senha"
> = {
  required: "A senha é obrigatória",
  validate: (value: string) =>
    (value.match(/\d/g) || []).length >= 1 ||
    "A senha deve conter pelo menos 1 número",
};