import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { RecuperarSenhaLink } from "./RecuperarSenhaLink";
import type { EntrarFormData } from "../../data/types/entrar.types";
import { useState } from "react";

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
  const [mostrarSenha, setMostrarSenha] = useState(false)
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
                <div className="relative">
                  <Input
                    {...field}
                    type={
                      mostrarSenha
                        ? "text"
                        : "password"
                    }
                    placeholder="Digite sua senha"
                    className="text-white pr-10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarSenha(
                        !mostrarSenha
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    {mostrarSenha ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
          bg-transparent text-white hover:scale-101"
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