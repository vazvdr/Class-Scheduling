import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type {
  RecuperarSenhaFormData,
} from "../../data/types/recuperar-senha.types";

interface RecuperarSenhaFormProps {
  form: UseFormReturn<RecuperarSenhaFormData>;
  loading: boolean;
  bloqueado: boolean;
  onSubmit: (
    data: RecuperarSenhaFormData
  ) => Promise<void>;
}

export function RecuperarSenhaForm({
  form,
  loading,
  bloqueado,
  onSubmit,
}: RecuperarSenhaFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "O email é obrigatório",
            validate: (value: string) => {
              const formatoValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  value
                );

              const dominioValido =
                /@(gmail|hotmail|outlook|yahoo)\./.test(
                  value
                );

              if (!formatoValido) {
                return "Digite um email válido";
              }

              if (!dominioValido) {
                return "Aceitamos apenas gmail, hotmail, outlook ou yahoo";
              }

              return true;
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Email
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite seu email cadastrado"
                  className="text-white"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={loading || bloqueado}
          className={`w-full font-semibold py-2 rounded transition
          cursor-pointer border border-white
          ${
            loading || bloqueado
              ? "bg-black text-white cursor-not-allowed"
              : "bg-transparent text-white hover:bg-white hover:text-black"
          }`}
        >
          {loading
            ? "Enviando..."
            : "Enviar link de recuperação"}
        </button>
      </form>
    </Form>
  );
}