interface Props {
  etapa: number;
}

export function EtapasEditarAgendamento({
  etapa,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center md:justify-center lg:justify-start lg:ml-[10%]">
      <div
        className={`px-4 py-2 rounded ${
          etapa === 1
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        1 - Selecione o assunto
      </div>

      <div
        className={`px-4 py-2 rounded ${
          etapa === 2
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        2 - Selecione o professor
      </div>

      <div
        className={`px-4 py-2 rounded ${
          etapa === 3
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        3 - Selecione o horário
      </div>
    </div>
  );
}