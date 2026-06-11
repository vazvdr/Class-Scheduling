import { UseFormReturn } from "react-hook-form";

import { EntrarForm } from "./EntrarForm";
import { EntrarFooter } from "./EntrarFooter";

import type {
  EntrarFormData,
} from "../../data/types/entrar.types";

interface EntrarCardProps {
  form: UseFormReturn<EntrarFormData>;
  isLogin: boolean;
  loginLoading: boolean;
  loading: boolean;
  toggleForm: () => void;
  onSubmit: (data: EntrarFormData) => Promise<void>;
  irParaRecuperarSenha: () => void;
}

export function EntrarCard(props: EntrarCardProps) {
  return (
    <div
      className="border border-white shadow-lg rounded-xl
      p-4 w-[90%] max-w-md bg-zinc-900 z-10
      max-h-[75vh] overflow-y-auto
      scrollbar-thin scrollbar-thumb-zinc-700
      scrollbar-track-transparent scrollbar-none"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        {props.isLogin ? "Entrar" : "Cadastrar"}
      </h2>

      <EntrarForm {...props} />

      <EntrarFooter
        isLogin={props.isLogin}
        toggleForm={props.toggleForm}
      />
    </div>
  );
}