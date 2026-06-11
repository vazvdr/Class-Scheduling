import { AgendamentoSelecionado, HorariosDisponiveis, ExcedeuPeriodoFn } from "../../data/types/agendamento.types";

type Periodo = "manha" | "tarde" | "noite";

interface Props {
  horarios: HorariosDisponiveis;
  loadingHorarios: boolean;
  selecionado: AgendamentoSelecionado;
  setSelecionado: React.Dispatch<
    React.SetStateAction<AgendamentoSelecionado>
  >;
  setEtapa: (etapa: number) => void;
  excedeuPeriodo: ExcedeuPeriodoFn
}

export default function HorarioStep({
  horarios,
  loadingHorarios,
  selecionado,
  setSelecionado,
  setEtapa,
  excedeuPeriodo,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Datas */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          DATAS DISPONÍVEIS
        </h2>

        {loadingHorarios && !selecionado.data && (
          <p className="text-white mb-4">
            Carregando...
          </p>
        )}

        <div className="flex flex-wrap gap-x-0">
          {Object.keys(horarios).map((data: string) => {
            const diaSemana = new Date(
              `${data}T00:00:00`
            ).toLocaleDateString("pt-BR", {
              weekday: "short",
            });

            const dia = new Date(
              `${data}T00:00:00`
            ).getDate();

            const mes = new Date(
              `${data}T00:00:00`
            ).toLocaleDateString("pt-BR", {
              month: "short",
            });

            const selecionadoData =
              selecionado.data === data;

            return (
              <div
                key={data}
                onClick={() =>
                  setSelecionado({
                    ...selecionado,
                    data,
                    horario: "",
                    horariosSelecionados: [],
                  })
                }
                className={`flex flex-col items-center px-2 py-2 rounded-lg cursor-pointer w-14 md:w-20
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
          })}
        </div>
      </div>

      {/* Horários */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Horários Disponíveis
        </h2>

        <div className="flex flex-col gap-4">
          {(
            ["manha", "tarde", "noite"] as Periodo[]
          ).map((periodo) => {
            const horariosPeriodo: string[] =
              horarios?.[selecionado.data]?.[
                periodo
              ] || [];

            return (
              <div key={periodo}>
                <h3 className="text-white text-sm font-semibold mb-2 uppercase">
                  {periodo}
                </h3>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {horariosPeriodo.map(
                    (horario: string) => {
                      const selecionadoHorario =
                        selecionado.horariosSelecionados.includes(
                          horario
                        );

                      return (
                        <div
                          key={horario}
                          className={`relative group text-sm rounded-md px-2 py-1 border text-center cursor-pointer transition-all duration-200
                          ${
                            selecionadoHorario
                              ? "bg-blue-600 text-white border-blue-400"
                              : horario.includes(
                                  "(ocupado)"
                                )
                              ? "bg-black text-white border-red-600"
                              : "bg-black text-white border-white hover:bg-blue-600"
                          }`}
                          onClick={() => {
                            const horarioBase =
                              horario.replace(
                                " (ocupado)",
                                ""
                              );

                            const blocos =
                              (selecionado.duracao ||
                                15) / 15;

                            const index =
                              horariosPeriodo.findIndex(
                                (h: string) =>
                                  h.startsWith(
                                    horarioBase
                                  )
                              );

                            if (index === -1)
                              return;

                            const slots =
                              horariosPeriodo.slice(
                                index,
                                index + blocos
                              );

                            const todosLivres =
                              slots.every(
                                (h: string) =>
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
                                  (h: string) =>
                                    h.replace(
                                      " (ocupado)",
                                      ""
                                    )
                                );

                              setSelecionado({
                                ...selecionado,
                                horario:
                                  horarioBase,
                                horariosSelecionados:
                                  horariosLimpos,
                              });
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

                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
                                  {horario}
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
          })}
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