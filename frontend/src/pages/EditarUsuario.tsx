import Banner from "../assets/Banner.jpg";

import Header from "../components/header/Header";

import { EditarUsuarioCard } from "../components/editar/usuario/EditarUsuarioCard";
import { EditarUsuarioAlert } from "../components/editar/usuario/EditarUsuarioAlert";
import { EditarUsuarioDeleteDialog } from "../components/editar/usuario/EditarUsuarioDeleteDialog";

import { useEditarUsuario } from "../data/hooks/useEditarUsuario";

export default function EditarUsuario() {
  const {
    form,
    alerta,
    loadingAtualizar,
    confirmarExclusao,
    onSubmit,
    handleDeletar,
    confirmarDelete,
    setConfirmarExclusao,
  } = useEditarUsuario();

  return (
    <>
      <div
        className="bg-black/70 relative w-screen min-h-screen
        overflow-hidden home-header-wrapper"
      >
        <img
          src={Banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <Header />

        <div
          className="relative z-20 px-4 pt-18 pb-10
          flex flex-col items-center gap-10"
        >
          <div className="text-center">
            <h1
              className="text-3xl font-extrabold text-transparent
              bg-clip-text bg-gradient-to-r
              from-yellow-400 to-pink-300"
            >
              Editar Perfil
            </h1>

            <p className="text-gray-300 mt-1 text-sm sm:text-base">
              Atualize seus dados
            </p>
          </div>

          <EditarUsuarioCard
            form={form}
            loadingAtualizar={loadingAtualizar}
            onSubmit={onSubmit}
            handleDeletar={handleDeletar}
          />
        </div>
      </div>

      <EditarUsuarioAlert alerta={alerta} />

      <EditarUsuarioDeleteDialog
        open={confirmarExclusao}
        onOpenChange={setConfirmarExclusao}
        onConfirm={confirmarDelete}
      />
    </>
  );
}