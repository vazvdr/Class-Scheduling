import { UseFormReturn } from "react-hook-form";

import { RedefinirSenhaAlert }
  from "./RedefinirSenhaAlert";

import { RedefinirSenhaForm }
  from "./RedefinirSenhaForm";

import type {
  RedefinirSenhaAlertData,
  RedefinirSenhaFormData,
} from "../../data/types/redefinir-senha.types";

interface RedefinirSenhaCardProps {
  form: UseFormReturn<RedefinirSenhaFormData>;
  alerta: RedefinirSenhaAlertData;
  loading: boolean;
  token: string | null;
  onSubmit: (
    data: RedefinirSenhaFormData
  ) => Promise<void>;
}

export function RedefinirSenhaCard({
  form,
  alerta,
  loading,
  token,
  onSubmit,
}: RedefinirSenhaCardProps) {
  return (
    <div
      className="border border-white shadow-lg rounded-xl
      p-4 w-[90%] max-w-md bg-zinc-900 z-10 mt-4
      max-h-[65vh] overflow-y-auto
      scrollbar-thin scrollbar-thumb-zinc-700
      scrollbar-track-transparent"
    >
      <h2
        className="text-2xl font-bold mb-4 text-center
        bg-clip-text text-transparent
        bg-gradient-to-r from-red-600 to-blue-500"
      >
        Redefinir Senha
      </h2>

      <RedefinirSenhaAlert
        visivel={alerta.visivel}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
      />

      <RedefinirSenhaForm
        form={form}
        loading={loading}
        token={token}
        onSubmit={onSubmit}
      />
    </div>
  );
}