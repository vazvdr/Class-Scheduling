import { imagens } from "../../utils/imagens";
import { Assunto, AgendamentoSelecionado } from "../../data/types/agendamento.types";

interface Props {
  assuntos: Assunto[];
  loadingAssuntos: boolean;
  selecionado: AgendamentoSelecionado;
  setSelecionado: React.Dispatch<
    React.SetStateAction<AgendamentoSelecionado>
  >;
  setEtapa: (etapa: number) => void;
}

export default function AssuntoStep({
  assuntos,
  loadingAssuntos,
  selecionado,
  setSelecionado,
  setEtapa,
}: Props) {
  return (
    <>
      <h2 className="text-white text-xl font-bold mb-4">
        Assuntos Disponíveis
      </h2>

      {loadingAssuntos && (
        <p className="text-white mb-4">
          Carregando...
        </p>
      )}

      <div className="w-[98%] sm:w-[80%] md:w-[66%] lg:w-[70%] grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 place-items-center">
        {assuntos.map((assunto) => {
          const imagem = imagens[assunto.nome];

          return (
            <div
              key={assunto.id}
              onClick={() =>
                setSelecionado({
                  ...selecionado,
                  assunto,
                  duracao: assunto.duracao,
                  professor: null,
                  horario: "",
                  horariosSelecionados: [],
                })
              }
              className={`w-full max-w-[10rem] cursor-pointer border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${
                selecionado.assunto?.nome === assunto.nome
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-200 bg-zinc-800"
              }`}
            >
              {imagem ? (
                <img
                  src={imagem}
                  alt={assunto.nome}
                  className="w-full h-28 object-cover"
                />
              ) : (
                <div className="w-full h-28 bg-black flex items-center justify-center">
                  <p className="text-xs text-center text-white">
                    Imagem não encontrada
                  </p>
                </div>
              )}

              <div className="p-2 text-center text-white bg-black/10">
                <p className="text-sm font-medium h-8">
                  {assunto.nome}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-6 mb-6">
        <button
          disabled
          className="bg-zinc-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Voltar
        </button>

        <button
          disabled={!selecionado.assunto}
          onClick={() => setEtapa(2)}
          className="bg-zinc-700 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          Próximo
        </button>
      </div>
    </>
  );
}