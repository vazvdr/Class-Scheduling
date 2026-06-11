export const excedeuPeriodo = (
  horario: string,
  periodo: string,
  duracao: number
): boolean => {
  const [hora, minuto] = horario
    .split(":")
    .map(Number);

  const inicio = new Date();

  inicio.setHours(
    hora,
    minuto,
    0,
    0
  );

  const fim = new Date(
    inicio.getTime() +
      duracao * 60000
  );

  const limites = {
    manha: [8, 12],
    tarde: [14, 18],
    noite: [19, 22],
  };

  const [, fimPeriodo] =
    limites[
      periodo as keyof typeof limites
    ];

  const dataFim = new Date();

  dataFim.setHours(
    fimPeriodo,
    0,
    0,
    0
  );

  return fim > dataFim;
};