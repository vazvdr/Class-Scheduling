import Banner from "../assets/Banner2.webp";

import { AuthHeader } from "../components/header/AuthHeader";
import { RecuperarSenhaCard } from "../components/recuperar-senha/RecuperarSenhaCard";
import { RecuperarSenhaAlert } from "../components/recuperar-senha/RecuperarSenhaAlert";
import { useRecuperarSenha } from "../data/hooks/useRecuperarSenha";

export default function RecuperarSenha() {
  const {
    form,
    alerta,
    loading,
    bloqueado,
    handleEnviar,
  } = useRecuperarSenha();

  return (
    <div
      className="bg-black/70 relative
      h-screen w-screen flex flex-col
      items-center px-4 overflow-hidden"
    >
      <img
        src={Banner}
        alt="Banner"
        className="absolute inset-0
        w-full h-full object-cover"
      />

      <AuthHeader />

      <RecuperarSenhaCard
        form={form}
        alerta={alerta}
        loading={loading}
        bloqueado={bloqueado}
        onSubmit={handleEnviar}
      />
    </div>
  );
}