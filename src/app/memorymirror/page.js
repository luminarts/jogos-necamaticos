import RoutingButton from "../client_components/RoutingButton";

export default function MemoryMirror() {
  
  // 1st: Circle Memorization Task
  // 2nd: Symmetry Game
  // 3rd: Rotation Game
  // 4th: Add figures game
  // 5th: Circle Memorization Answer
  // Repeat n times, Score until the first wrong answer

  // This page will only have "Começar" and "Próximo Jogo". This will serve as a kind of control panel
  const pageHRefs = ['memorymirror/memory', 'memorymirror/mirror', 'memorymirror/rotate', 'memorymirror/join', 'memorymirror/memoryAnswer']

  return(
    <div className="flex flex-col justify-center items-center">
      <div className="h-screen flex justify-center items-center">
        <p>Memória e Lógica</p>
        <RoutingButton></RoutingButton>
      </div>

    </div>
  );
}