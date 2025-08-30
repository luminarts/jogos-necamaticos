"use client"
import {useState, useEffect} from 'react'
import PiscaButton from '../client_components/piscaButtons';

export default function Pisca() {
  /* Coisas que faltam fazer:
  - fazer o blink dos quadrados
  - função de checar pra ver se arrays são iguais
  - checar a cada clique se equivale ao quadrado 
  - fazer um useEffect pra variavel os eligibleIds pra quando ela mudar, redistribuir os Ids entre os botões (deixar independente do tamanho do grid)
  - botão para começar o blink
  */

  const [show4x4Grid, enable4x4Grid] = useState(false);
  const [show5x5Grid, enable5x5Grid] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userBlinkOrder, setUserBlinkOrder] = useState([]);
  const [correctBlinkOrder, setCorrectBlinkOrder] = useState([1, 2]);
  const [showCorrectOrder, setShowCorrectOrder] = useState(false);

  var eligibleIds = [];
  var randAmountOfBlinks = 0;
  var auxBlinkOrder = [];

  // uma iteração a cada mudança de level
  useEffect(() => {
    if(currentLevel > 3) {
      enable4x4Grid(true);
    }
    if(currentLevel > 7) {
      enable5x5Grid(true);
    }
    
    eligibleIds = enable4x4Grid? (enable5x5Grid? Array.from({ length: 25 }, (_, i) => i + 1) : Array.from({ length: 16 }, (_, i) => i + 1)): Array.from({ length: 4 }, (_, i) => i + 1);
    
    randAmountOfBlinks = Math.floor(Math.random() * eligibleIds.length);
    
    for (var i = 0; i < randAmountOfBlinks; i++) {
      auxBlinkOrder.push(Math.floor(Math.random() * eligibleIds.length));
    }
    setCorrectBlinkOrder(auxBlinkOrder);
    auxBlinkOrder = []
    

  },[currentLevel]);


  // Checar se cada número tá certo quando clicado
  useEffect(() => {
    if(!userBlinkOrder[userBlinkOrder.length - 1] == correctBlinkOrder[userBlinkOrder.length - 1]) {
      // tratar o que acontece quando é errado (manter numa mesma cor diferente? voltar pro início?)
    }
  }, [userBlinkOrder])
  

  // for (var i = 0; i < eligibleIds.length; i++) {

  // }

  // Fazer mostrar a ordem certa

  useEffect(() => {
    
  }, [showCorrectOrder]);

  return (
<div className="flex flex-col justify-center items-center">
  <div className="h-screen flex flex-row items-center justify-center">
    <div className="grid grid-cols-5 gap-4">
      <PiscaButton buttonId={1} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={2} userBlinkOrder={userBlinkOrder}></PiscaButton>
      {show4x4Grid && <PiscaButton buttonId={5} userBlinkOrder={userBlinkOrder}></PiscaButton>}
      {show4x4Grid && <PiscaButton buttonId={6} userBlinkOrder={userBlinkOrder}></PiscaButton>}
      <PiscaButton buttonId={17} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={3} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={4} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={7} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={8} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={18} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={9} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={10} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={11} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={12} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={19} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={13} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={14} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={15} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={16} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={20} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={21} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={22} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={23} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={24} userBlinkOrder={userBlinkOrder}></PiscaButton>
      <PiscaButton buttonId={25} userBlinkOrder={userBlinkOrder}></PiscaButton>
    </div>
    <button className="p-2 border-2 mx-4 hover:bg-gray-200 ">Mostrar ordem correta</button>
  </div>
</div>
  );
}