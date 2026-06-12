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
import { RecuperarSenhaLink } from "./RecuperarSenhaLink";
import type { EntrarFormData } from "../../data/types/entrar.types";

interface EntrarFormProps {
  form: UseFormReturn<EntrarFormData>;
  isLogin: boolean;
  loading: boolean;
  loginLoading: boolean;
  onSubmit: (data: EntrarFormData) => Promise<void>;
  irParaRecuperarSenha: () => void;
}

export function EntrarForm({
  form,
  isLogin,
  loading,
  loginLoading,
  onSubmit,
  irParaRecuperarSenha,
}: EntrarFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {!isLogin && (
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Nome
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite seu nome completo"
                    className="text-white"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Email
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Digite seu email"
                  className="text-white"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Senha
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Digite sua senha"
                  className="text-white"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {!isLogin && (
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Telefone
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Digite seu telefone"
                    className="text-white"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isLogin && (
          <RecuperarSenhaLink
            onClick={irParaRecuperarSenha}
          />
        )}

        <button
          type="submit"
          disabled={loading || loginLoading}
          className="w-full font-semibold py-2 rounded
          transition cursor-pointer border border-white
          bg-transparent text-white hover:border-black"
        >
          {isLogin
            ? loginLoading
              ? "Entrando..."
              : "Entrar"
            : loading
            ? "Cadastrando..."
            : "Cadastrar"}
        </button>
      </form>
    </Form>
  );
}