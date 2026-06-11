export const validarEmail = (value: string) => {
  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const dominioValido =
    /@(gmail|hotmail|outlook|yahoo)\./.test(value);

  if (!formatoValido) {
    return "Digite um email válido";
  }

  if (!dominioValido) {
    return "Aceitamos apenas emails gmail, hotmail, outlook e yahoo";
  }

  return true;
};

export const validarSenha = (value: string) => {
  return (
    (value.match(/\d/g) || []).length >= 1 ||
    "A senha deve conter pelo menos 1 número"
  );
};