import { Cover } from "../ui/cover";

interface HomeHeroProps {
  onAgendar: () => void;
}

export function HomeHero({
  onAgendar,
}: HomeHeroProps) {
  return (
    <div
      className="flex flex-col items-center
      text-center px-4 w-[90%]
      md:w-2xl gap-y-0.5"
    >
      <div
        className="text-4xl font-bold
        leading-tight px-4 py-1
        rounded-md bg-black"
      >
        <p>
          <span
            className="bg-gradient-to-r
            from-purple-600 to-blue-800
            bg-clip-text text-transparent"
          >
            Seja bem vindo à
          </span>
        </p>
      </div>

      <Cover
        className="text-4xl font-bold
        rounded-lg"
      >
        Class Scheduling
      </Cover>

      <p
        className="text-blue-300 font-semibold
        px-4 py-2 rounded-md bg-black"
      >
        A escola mais foda da internet 💥
      </p>

      <button
        onClick={onAgendar}
        className="bg-black border border-white
        text-white px-6 py-2 rounded
        hover:bg-green-400 hover:text-black
        hover:scale-105 transition
        cursor-pointer"
      >
        Agende sua Aula
      </button>
    </div>
  );
}