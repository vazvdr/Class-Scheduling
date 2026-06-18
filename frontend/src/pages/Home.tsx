import Header from "../components/header/Header";
import Banner from "../assets/Banner2.webp";
import { HomeHero } from "../components/home/HomeHero";
import { useHome } from "../data/hooks/useHome";

export default function Home() {
  const { redirecionarAgendamento } = useHome();

  return (
    <div
      className="bg-black/70 relative
      w-screen h-screen overflow-hidden
      home-header-wrapper"
    >
      <img
        src={Banner}
        alt="Banner"
        className="absolute inset-0
        w-full h-full object-cover"
      />

      <Header />

      <div
        className="relative h-screen w-screen
        flex items-center justify-center
        overflow-hidden"
      >
        <HomeHero
          onAgendar={
            redirecionarAgendamento
          }
        />
      </div>
    </div>
  );
}