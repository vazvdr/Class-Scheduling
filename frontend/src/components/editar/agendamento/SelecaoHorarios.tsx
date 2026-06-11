type Props = {
  horarios: Record<string, any>;
  selecionado: any;
  setSelecionado: React.Dispatch<React.SetStateAction<any>>;
  loadingHorarios: boolean;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;
  excedeuPeriodo: (
    horario: string,
    periodo: string,
    duracao: number
  ) => boolean;
};

export function SelecaoHorarios({
  horarios,
  selecionado,
  setSelecionado,
  loadingHorarios,
  setEtapa,
  excedeuPeriodo,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Datas Disponíveis
        </h2>

        {loadingHorarios &&
          !selecionado.data && (
            <p className="text-white mb-4">
              Carregando...
            </p>
          )}

        <div className="flex flex-wrap gap-x-0">
          {Object.keys(horarios).map(
            (data) => {
              const diaSemana =
                new Date(
                  data +
                    "T00:00:00"
                ).toLocaleDateString(
                  "pt-BR",
                  {
                    weekday:
                      "short",
                  }
                );

              const dia =
                new Date(
                  data +
                    "T00:00:00"
                ).getDate();

              const mes =
                new Date(
                  data +
                    "T00:00:00"
                ).toLocaleDateString(
                  "pt-BR",
                  {
                    month:
                      "short",
                  }
                );

              const selecionadoData =
                selecionado.data ===
                data;

              return (
                <div
                  key={data}
                  onClick={() =>
                    setSelecionado(
                      (
                        prev: any
                      ) => ({
                        ...prev,
                        data,
                        horario:
                          "",
                        horariosSelecionados:
                          [],
                      })
                    )
                  }
                  className={`flex flex-col items-center px-2 py-2 rounded-lg cursor-pointer w-14 md:w-18
                  ${
                    selecionadoData
                      ? "bg-blue-600 text-black border border-white font-bold"
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
            }
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          HORÁRIOS
          DISPONÍVEIS
        </h2>

        <div className="flex flex-col gap-4">
          {[
            "manha",
            "tarde",
            "noite",
          ].map(
            (periodo) => {
              const horariosPeriodo =
                horarios?.[
                  selecionado
                    .data
                ]?.[
                  periodo
                ] || [];

              return (
                <div
                  key={periodo}
                >
                  <h3 className="text-white text-sm font-semibold mb-2 uppercase">
                    {periodo}
                  </h3>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {horariosPeriodo.map(
                      (
                        horario: string
                      ) => {
                        const selecionadoHorario =
                          selecionado.horariosSelecionados?.includes(
                            horario
                          );

                        return (
                          <div
                            key={
                              horario
                            }
                            className={`relative group text-sm rounded-md px-2 py-1 border text-center cursor-pointer transition-all duration-200
                            ${
                              selecionadoHorario
                                ? "bg-blue-600 text-white border-blue-400"
                                : horario.includes(
                                    "(ocupado)"
                                  )
                                ? "bg-black text-white border-red-600"
                                : "bg-neutral-800 text-white border-black hover:bg-neutral-700"
                            }`}
                            onClick={() => {
                              const horarioBase =
                                horario.replace(
                                  " (ocupado)",
                                  ""
                                );

                              const blocos =
                                (
                                  selecionado.duracao ||
                                  15
                                ) /
                                15;

                              const index =
                                horariosPeriodo.findIndex(
                                  (
                                    h: string
                                  ) =>
                                    h.startsWith(
                                      horarioBase
                                    )
                                );

                              if (
                                index ===
                                -1
                              )
                                return;

                              const slots =
                                horariosPeriodo.slice(
                                  index,
                                  index +
                                    blocos
                                );

                              const todosLivres =
                                slots.every(
                                  (
                                    h: string
                                  ) =>
                                    !h.includes(
                                      "(ocupado)"
                                    )
                                );

                              if (
                                slots.length ===
                                  blocos &&
                                todosLivres
                              ) {
                                const horariosLimpos =
                                  slots.map(
                                    (
                                      h: string
                                    ) =>
                                      h.replace(
                                        " (ocupado)",
                                        ""
                                      )
                                  );

                                setSelecionado(
                                  (
                                    prev: any
                                  ) => ({
                                    ...prev,
                                    horario:
                                      horarioBase,
                                    horariosSelecionados:
                                      horariosLimpos,
                                  })
                                );
                              }
                            }}
                          >
                            <span className="inline-block font-bold">
                              {horario.includes(
                                "(ocupado)"
                              ) ? (
                                <>
                                  <span className="group-hover:hidden">
                                    x
                                  </span>

                                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 whitespace-nowrap">
                                    Agendado
                                  </span>
                                </>
                              ) : excedeuPeriodo(
                                  horario,
                                  periodo,
                                  selecionado.duracao ||
                                    15
                                ) ? (
                                <>
                                  <span className="group-hover:hidden">
                                    {
                                      horario
                                    }
                                  </span>

                                  <span className="hidden group-hover:inline">
                                    x
                                  </span>
                                </>
                              ) : (
                                horario
                              )}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div className="flex gap-2 mt-6 mb-12 text-center">
          <button
            onClick={() =>
              setEtapa(2)
            }
            className="bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}