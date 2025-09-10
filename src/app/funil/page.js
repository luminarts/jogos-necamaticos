"use client"
import { useState, useEffect } from "react";
import ShuffleOptions from "../client_components/shuffleOptions";
import CountdownTimer from "../client_components/countdownTimer";
import Image from "next/image";
/* A ordem que tá sendo calculada e embaralhada aqui seria como se fossem os elementos em si do negócio mudando de posição ao passar pelo funil
O que vai ser mostrado no display de opções vai ser as mudanças realizadas nos indexes desses elementos
Ex:

shuffle:
ABCD          0123 (indexes originais)
DBCA          3120 (o D mudou de index pra 0 e o A mudou de index pra 3)
CABD          2310


*/


function shuffleArray(array) {
  var currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function generateShuffles(level) {
  var shuffleList = [], floors, auxShuffle;
  var initialOrder = [1, 2, 3, 4];

  floors = level <= 3 ? 2 : (level <= 7 ? 3 : 4);
  for (var i = 0; i < floors; i++) {
    auxShuffle = shuffleArray([...initialOrder]);
    shuffleList.push(auxShuffle);
  }
  return shuffleList;  
}

function calculateDisplayIndices(shuffleList) {
  var displayIndices = [], aux = [];

  for (var i = 1; i < shuffleList.length; i++) {
    for (var j = 0; j < 4; j++) {
      // vou pegar o elemento shuffleList[1][0] e procurar seu index no shuffleList[0]
      aux.push(shuffleList[i - 1].indexOf(shuffleList[i][j]));
    }
    displayIndices.push(aux);
    aux = [];
  }
  return displayIndices;
}

export default function Funil() {

  /* CONSERTAR:

  */

  /* gerar primeiros shuffles e calcular os display indices.
    depois, useEffect para cada mudança de level gerar novos shuffles e calcular novos display indices
  
  */
  const [level, setLevel] = useState(1);
  const [shuffleList, setShuffleList] = useState(() => generateShuffles(level));
  const [displayShuffles, setDisplayShuffles] = useState(() => calculateDisplayIndices(shuffleList));
  const [answerIndex, setAnswerIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const imageFiles = [
    "/circulo.png", "/quadrado.png", "/triangulo.png", "/cruz.png"
  ];
  // EFFECT HANDLES


  // ACTION HANDLES 

  const startGame = () => {
    const nextShuffle = generateShuffles(level);
    const nextDisplay = calculateDisplayIndices(nextShuffle);

    setShuffleList(nextShuffle);
    setDisplayShuffles(nextDisplay);
    setShowGame(true);
    console.log("nextShuffleList: ", nextShuffle);
    console.log("nextDisplayShuffle: ", nextDisplay);

  }

  const handleSubmit = () => {
    var nextLevel = level;
    var answer = displayShuffles[answerIndex].map(function(number) {
      return number + 1;
    })
    
    if (userAnswer.join('') == answer.join('')) {
      nextLevel++;
    } else if (level > 1) {
      nextLevel--;
    }

    const nextShuffle = generateShuffles(nextLevel);
    const nextDisplay = calculateDisplayIndices(nextShuffle);

    // 0 para level 1-5 e 8-9 || 1 para level 6-7 e 10-11 14-15 || 2 para level 12-13 
    const nextAnswerIndex = nextLevel > 5 ? (nextLevel <= 7? 1 : (nextLevel <= 9? 0 : (nextLevel <= 11? 1 : (nextLevel <= 13? 2 : 1)))) : 0;

    setLevel(nextLevel);
    setShuffleList(nextShuffle);
    setDisplayShuffles(nextDisplay);
    setAnswerIndex(nextAnswerIndex);
    console.log("nextShuffleList: ", nextShuffle);
    console.log("nextDisplayShuffle: ", nextDisplay);

  }

  const handleUserSelection = (value) => {
    const auxUserSelection = value;
    setUserAnswer(auxUserSelection); 
    console.log("UserAnswer: ", auxUserSelection);
  }

  return(
    <div className="flex justify-center items-center dark:bg-black dark:text-white">
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="border-2 p-4 bg-white text-black dark:bg-black dark:text-white">Level Atual: {level}</p>
        <CountdownTimer onTimerStart={startGame} level={level}></CountdownTimer>
        { showGame &&
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row m-4 gap-4 bg-gray-600 p-3 rounded">
            <Image src={imageFiles[shuffleList[0][0] - 1]} alt="circulo" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[0][1] - 1]} alt="quadrado" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[0][2] - 1]} alt="triangulo" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[0][3] - 1]} alt="cruz" width={50} height={50}></Image>
          </div>
          {((level > 5 && level <= 7) || (level > 9))  && <div className="border-2 p-2 bg-white text-black dark:bg-black dark:text-white">{displayShuffles[0]}</div>}
          {level > 11 && level <= 13 && <div className="border-2 p-2 bg-white text-black dark:bg-black dark:text-white">{displayShuffles[1].map()}</div>}
          <ShuffleOptions answer={displayShuffles[answerIndex]} handleUserSelection={handleUserSelection} level={level}></ShuffleOptions>
          {((level > 3 && level <= 5) || (level > 7)) && <div className="border-2 p-2 m-2 bg-white text-black dark:bg-black dark:text-white">{displayShuffles[1]}</div>}
          {level > 7 && level <= 9 && <div className="border-2 p-2 m-2 bg-white text-black dark:bg-black dark:text-white">{displayShuffles[2]}</div>} 
          <div className="flex flex-row m-4 gap-4 bg-gray-600 p-3 rounded">
            <Image src={imageFiles[shuffleList[shuffleList.length - 1][0] - 1]} alt="circulo" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[shuffleList.length - 1][1] - 1]} alt="quadrado" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[shuffleList.length - 1][2] - 1]} alt="triangulo" width={50} height={50}></Image>
            <Image src={imageFiles[shuffleList[shuffleList.length - 1][3] - 1]} alt="cruz" width={50} height={50}></Image>
          </div>
          <button onClick={handleSubmit} className="border-2 p-2 m-5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">Enviar</button>
        </div>
        }
      </div>
    </div>
  );
}