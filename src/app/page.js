import RoutingButton from "./client_components/RoutingButton";

export default function Home() {
  return (
  <div className="h-screen flex flex-col justify-center items-center dark:bg-black dark:text-white bg-white text-black">
    <div className=" p-8 ">
      Escolha o jogo que deseja jogar:
    </div>
    <div className="flex justify-center items-center ">
      <div className="border-2 border-black-500 p-4 m-4 flex flex-col sm:flex-row">
        <RoutingButton href={'/equacao'}>
          Complete a equação!
        </RoutingButton>
        <RoutingButton href={'/pisca'}>
          Repita na ordem que pisca!
        </RoutingButton>
        <RoutingButton href={'/funil' }>
          Funil!
        </RoutingButton>
        <RoutingButton href={'/memorymirror'}>
          Jogo da Memória!
        </RoutingButton>
      </div>
    </div>

  </div>
  );
}
