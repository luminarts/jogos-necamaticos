import RoutingButton from "./client_components/routingButton";

export default function Home() {
  return (
  <div className="h-screen flex flex-col items-center justify-center dark:bg-black dark:text-white">
    <div className="bg-black-500 p-8 text-black">
      Escolha o jogo que deseja jogar:
    </div>
    <div className="flex flex-row">
      <div className="border-2 border-black-500 p-4 m-4">
        <RoutingButton href={'/equacao'}>
          Complete a equação!
        </RoutingButton>
        <RoutingButton href={'/pisca'}>
          Repita na ordem que pisca!
        </RoutingButton>
        <RoutingButton href={'/funil' }>
          Funil!
        </RoutingButton>
      </div>
    </div>

  </div>
  );
}
