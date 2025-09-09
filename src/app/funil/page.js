"use client"
import { useState, useEffect } from "react";

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
    console.log("initialOrder: ", initialOrder);
    auxShuffle = shuffleArray(initialOrder);
    console.log("auxShuffle: ", auxShuffle);
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

  // EFFECT HANDLES

  useEffect(() => {
    console.log('shuffleList: ', shuffleList);
    console.log('displayShuffles: ', displayShuffles);

  }, [shuffleList, displayShuffles])

  // ACTION HANDLES 

  const changeShuffleList = () => {
    setLevel(level + 1);
    setShuffleList(generateShuffles(level));
    setDisplayShuffles(calculateDisplayIndices(shuffleList));
  }

  return(
    <div className="flex justify-center items-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <button onClick={changeShuffleList} className="border-2 p-2 hover:bg-black hover:text-white">bleh</button>
      </div>
    </div>
  );
}