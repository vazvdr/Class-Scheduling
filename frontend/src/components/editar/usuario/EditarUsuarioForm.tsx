import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";

import {
  nomeValidation,
  emailValidation,
  telefoneValidation,
  senhaValidation,
} from "../../../data/validations/editarUsuario.validations";

import type {
  EditarUsuarioFormData,
} from "../../../data/types/editar-usuario.types";

interface EditarUsuarioFormProps {
  form: UseFormReturn<EditarUsuarioFormData>;
  loadingAtualizar: boolean;
  handleDeletar: () => void;
  onSubmit: (
    data: EditarUsuarioFormData
  ) => Promise<void>;
}

export function EditarUsuarioForm({
  form,
  loadingAtualizar,
  handleDeletar,
  onSubmit,
}: EditarUsuarioFormProps) {
  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={control}
          name="nome"
          rules={nomeValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Novo Nome"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Novo Email"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="telefone"
          rules={telefoneValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>

              <FormControl>
                <Input
                  type="tel"
                  {...field}
                  placeholder="Novo Telefone"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="senha"
          rules={senhaValidation}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Nova Senha"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={loadingAtualizar}
          className="w-full flex items-center justify-center gap-2
          bg-transparent border border-white text-white
          font-semibold py-2 rounded-md hover:bg-white
          hover:text-black transition cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingAtualizar && (
            <div
              className="w-4 h-4 border-2 border-white
              border-t-transparent rounded-full animate-spin"
            />
          )}

          Atualizar
        </button>

        <button
          type="button"
          onClick={handleDeletar}
          className="w-full mt-3 border border-white
          bg-red-600 text-white font-semibold py-2
          rounded-md hover:bg-red-700 transition
          cursor-pointer"
        >
          Excluir Conta
        </button>
      </form>
    </Form>
  );
}