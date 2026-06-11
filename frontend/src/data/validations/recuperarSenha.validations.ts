export const emailValidation = {
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