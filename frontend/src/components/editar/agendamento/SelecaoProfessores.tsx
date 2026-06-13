import { imagens } from "@/utils/imagens";

interface Professor {
  id: number;
  nome: string;
}

interface Props {
  professores: Professor[];
  loadingProfessores: boolean;
  professorSelecionado: Professor | null;
  onSelecionarProfessor: (
    professor: Professor
  ) => void;
  onVoltar: () => void;
  onProximo: () => void;
}

export function SelecaoProfessores({
  professores,
  loadingProfessores,
  professorSelecionado,
  onSelecionarProfessor,
  onVoltar,
  onProximo,
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
          const imagem =
            imagens[
            prof.nome as keyof typeof imagens
            ];

          return (
            <div
              key={prof.id}
              onClick={() =>
                onSelecionarProfessor(
                  prof
                )
              }
              className={`w-40 cursor-pointer border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${professorSelecionado?.id ===
                  prof.id
                  ? "border-blue-600"
                  : "border-gray-200"
                }`}
            >
              <div className="w-full h-28 bg-zinc-800 flex items-center justify-center">
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

              <div
                className={`p-2 text-center text-white transition-colors ${professorSelecionado?.id === prof.id
                    ? "bg-blue-600"
                    : "bg-zinc-800"
                  }`}
              >
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
          onClick={onVoltar}
          className="bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Voltar
        </button>

        <button
          disabled={!professorSelecionado}
          onClick={onProximo}
          className="bg-zinc-700 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          Próximo
        </button>
      </div>
    </>
  );
}