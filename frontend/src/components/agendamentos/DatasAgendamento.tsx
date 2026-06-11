interface DatasAgendamentoProps {
  datasFuturas: string[];
  dataSelecionada: string;
  setDataSelecionada: (data: string) => void;
}

export function DatasAgendamento({
  datasFuturas,
  dataSelecionada,
  setDataSelecionada,
}: DatasAgendamentoProps) {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        SUAS AULAS
      </h2>

      <div className="flex flex-wrap gap-1 w-full justify-center">
        {datasFuturas.length === 0 ? (
          <p className="text-white">
            Nenhuma data encontrada.
          </p>
        ) : (
          datasFuturas.map((data) => {
            const diaSemana = new Date(
              data + "T00:00:00"
            ).toLocaleDateString("pt-BR", {
              weekday: "short",
            });

            const dia = new Date(
              data + "T00:00:00"
            ).getDate();

            const mes = new Date(
              data + "T00:00:00"
            ).toLocaleDateString("pt-BR", {
              month: "short",
            });

            return (
              <div
                key={data}
                onClick={() =>
                  setDataSelecionada(data)
                }
                className={`flex flex-col items-center px-2 sm:px-6 md:px-8 lg:px-10 py-2 rounded-lg cursor-pointer
                ${
                  dataSelecionada === data
                    ? "bg-blue-600 border border-white text-black font-bold"
                    : "bg-neutral-900 border border-white text-white"
                }
                hover:bg-blue-800 transition-all`}
              >
                <span className="text-xs uppercase">
                  {diaSemana}
                </span>

                <span className="text-lg font-bold">
                  {dia}
                </span>

                <span className="text-xs uppercase">
                  {mes}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}