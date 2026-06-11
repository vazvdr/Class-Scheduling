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

import {
  novaSenhaValidation,
  confirmarSenhaValidation,
} from "../../data/validations/redefinirSenha.validations";

import type {
  RedefinirSenhaFormData,
} from "../../data/types/redefinir-senha.types";

interface RedefinirSenhaFormProps {
  form: UseFormReturn<RedefinirSenhaFormData>;
  loading: boolean;
  token: string | null;
  onSubmit: (
    data: RedefinirSenhaFormData
  ) => Promise<void>;
}

export function RedefinirSenhaForm({
  form,
  loading,
  token,
  onSubmit,
}: RedefinirSenhaFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="novaSenha"
          rules={novaSenhaValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Nova Senha
              </FormLabel>

              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="text-white"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmarSenha"
          rules={confirmarSenhaValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Confirmar Senha
              </FormLabel>

              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="text-white"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={loading || !token}
          className={`w-full font-semibold py-2 rounded transition
          border border-white cursor-pointer ${
            loading || !token
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-transparent text-white hover:bg-white hover:text-black"
          }`}
        >
          {loading
            ? "Redefinindo..."
            : "Redefinir Senha"}
        </button>
      </form>
    </Form>
  );
}