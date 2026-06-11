import { UseFormReturn } from "react-hook-form";

import { RecuperarSenhaForm } from "./RecuperarSenhaForm";
import { RecuperarSenhaAlert } from "./RecuperarSenhaAlert";

import type {
  RecuperarSenhaFormData,
  RecuperarSenhaAlertData,
} from "../../data/types/recuperar-senha.types";

interface RecuperarSenhaCardProps {
  form: UseFormReturn<RecuperarSenhaFormData>;
  alerta: RecuperarSenhaAlertData;
  loading: boolean;
  bloqueado: boolean;
  onSubmit: (
    data: RecuperarSenhaFormData
  ) => Promise<void>;
}

export function RecuperarSenhaCard({
  form,
  alerta,
  loading,
  bloqueado,
  onSubmit,
}: RecuperarSenhaCardProps) {
  return (
    <div
      className="border border-white shadow-lg rounded-xl
      p-4 w-[80%] max-w-md bg-zinc-900 z-10 mt-4
      max-h-[65vh] overflow-y-auto
      scrollbar-thin scrollbar-thumb-zinc-700
      scrollbar-track-transparent"
    >
      <h2
        className="text-2xl font-bold mb-4 text-center
        bg-gradient-to-r from-red-600 to-blue-500
        text-transparent bg-clip-text"
      >
        Recuperar Senha
      </h2>

      <RecuperarSenhaAlert
        visivel={alerta.visivel}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
      />

      <RecuperarSenhaForm
        form={form}
        loading={loading}
        bloqueado={bloqueado}
        onSubmit={onSubmit}
      />
    </div>
  );
}