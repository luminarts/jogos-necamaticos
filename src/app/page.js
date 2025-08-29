import RoutingButton from "./client_components/routingButton";

export default function Home() {
  return (
  <div className="h-screen flex flex-col items-center justify-center">
    <div className="bg-black-500 p-8 text-black">
      Escolha o jogo que deseja jogar:
    </div>
    <div className="flex flex-row">
      <div className="border-2 border-black-500 p-4 m-4">
        <RoutingButton href={'/equacao'} className="border-2 border-black-500 rounded-lg m-4 p-2 hover:text-white transition hover:bg-black hover:scale-110">
          Complete a equação!
        </RoutingButton>
        <RoutingButton href={'/pisca'} className="border-2 border-black-500 rounded-lg m-4 p-2 hover:text-white transition hover:bg-black hover:scale-110">
          Repita na ordem que pisca!
        </RoutingButton>
      </div>
    </div>

  </div>
  );
}
