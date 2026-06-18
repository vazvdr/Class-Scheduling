import Banner from "../assets/Banner2.webp";

import { AuthHeader } from "../components/header/AuthHeader";

import { EntrarCard } from "../components/entrar/EntrarCard";
import { EntrarAlert } from "../components/entrar/EntrarAlert";

import { useEntrar } from "../data/hooks/useEntrar";

export default function Entrar() {
  const entrarProps = useEntrar();

  return (
    <div
      className="bg-black/70 relative h-screen w-screen
      flex items-center flex-col px-4 overflow-hidden"
    >
      <img
        src={Banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <AuthHeader />

      <EntrarAlert alerta={entrarProps.alerta} />

      <EntrarCard {...entrarProps} />
    </div>
  );
}