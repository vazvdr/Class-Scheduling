import { imagens } from "../../utils/imagens";
import { Professor, AgendamentoSelecionado } from "../../data/types/agendamento.types";

interface Props {
  professores: Professor[];
  loadingProfessores: boolean;
  selecionado: AgendamentoSelecionado;
  setSelecionado: React.Dispatch<
    React.SetStateAction<AgendamentoSelecionado>
  >;
  setEtapa: (etapa: number) => void;
}

export default function ProfessorStep({
  professores,
  loadingProfessores,
  selecionado,
  setSelecionado,
  setEtapa,
}: Props) {
  return (
    <>
      <h2 className="text-white text-xl font-bold mb-4">
        Professores Disponíveis
      </h2>

      {loadingProfessores && (
        <p className="text-white mb-4">
          Carregando...
        </p>
      )}

      <div className="w-[98%] sm:w-[70%] md:w-[66%] lg:w-[60%] grid grid-cols-2 sm:grid-cols-3 md:gap-x-0 lg:gap-x-10 xl:gap-x-16 gap-y-3">
        {professores.map((prof) => {
          const imagem = imagens[prof.nome];

          return (
            <div
              key={prof.id}
              onClick={() =>
                setSelecionado({
                  ...selecionado,
                  professor: prof,
                  horario: "",
                  horariosSelecionados: [],
                })
              }
              className={`w-40 cursor-pointer border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${
                selecionado.professor?.id === prof.id
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-200"
              }`}
            >
              <div className="w-full h-28 bg-white flex items-center justify-center">
                {imagem ? (
                  <img
                    src={imagem}
                    alt={prof.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="text-xs text-center text-gray-500">
                    Imagem não encontrada
                  </p>
                )}
              </div>

              <div className="p-2 text-center bg-black/10 text-white">
                <p className="text-sm font-medium">
                  {prof.nome}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => setEtapa(1)}
          className="bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Voltar
        </button>

        <button
          disabled={!selecionado.professor}
          onClick={() => setEtapa(3)}
          className="bg-zinc-700 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          Próximo
        </button>
      </div>
    </>
  );
}