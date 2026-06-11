import { UseFormReturn } from "react-hook-form";

import { EditarUsuarioForm } from "../usuario/EditarUsuarioForm";

import type {
  EditarUsuarioFormData,
} from "../../../data/types/editar-usuario.types";

interface EditarUsuarioCardProps {
  form: UseFormReturn<EditarUsuarioFormData>;
  loadingAtualizar: boolean;
  handleDeletar: () => void;
  onSubmit: (
    data: EditarUsuarioFormData
  ) => Promise<void>;
}

export function EditarUsuarioCard({
  form,
  loadingAtualizar,
  handleDeletar,
  onSubmit,
}: EditarUsuarioCardProps) {
  return (
    <div
      className="border border-white shadow-lg rounded-xl
      p-8 w-full max-w-md bg-zinc-900/95
      text-white relative"
    >

      <EditarUsuarioForm
        form={form}
        loadingAtualizar={loadingAtualizar}
        handleDeletar={handleDeletar}
        onSubmit={onSubmit}
      />
    </div>
  );
}