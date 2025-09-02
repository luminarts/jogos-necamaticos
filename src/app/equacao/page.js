"use client"
import CountdownTimer from "@/app/client_components/countdownTimer";
import TecladoButton from "../client_components/tecladoButton";
import { useState, useRef, useEffect } from "react";


/* Coisas a fazer ainda:
  -
  - checar valor do equation
*/


/**
 * Pega um número aleatório entre dois parametros definidos
 * @param {*} min - limite inferior (inclusive)
 * @param {*} max - limite superior (inclusive)
 * @returns número aleatório entre min e max
 */
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEquation(terms, blanks) {

  // Variáveis, constantes e inicializações
  const operatorsArray = ['+', '-', '*'];
  var equation = new Array(2*terms + 1).fill(0);
  var blanksPos = new Array(blanks);

  // Buscando quais vão ser os indices de blanks
  
  for (var i = 0; i < blanks; i++) {
    var randAux = getRandomInteger(0, terms - 1) * 2;
    while (blanksPos.includes(randAux)) {
      randAux = getRandomInteger(0, terms - 1) * 2;
    }
    blanksPos[i] = randAux;
  }

  for (var i = 0; i < 2*terms + 1; i+=2) {
    var num = getRandomInteger(2, 10);
    var op = operatorsArray[getRandomInteger(0, 2)];
    
    if (i == 2*terms && !blanksPos.includes(i)) {
      equation[i - 1] = '=';
      equation[i] = num;
    } else {
      
      equation[i] = blanksPos.includes(i)? '_' : num;
      equation[i + 1] = op;
    }
  }

  return [equation, blanksPos];
}
// num op num op num = result

function checkAnswer(equation) {
  var expectedResult = equation[equation.length - 1];
  var userResult = equation[0];

  for (var i = 1; i < equation.length - 2; i++) {
    switch (equation[i]) {
      case '+':
        userResult += equation[i + 1];
      case '-':
        userResult -= equation[i + 1];
      case '*':
        userResult *= equation[i + 1];
    }
    return expectedResult == userResult;
  }
}

export default function Equacao() {
  // Variables and states
  var terms = 2, blanks = 1, levels = 1, eq, blPos;
  const [showProblem, setShowProblem] = useState(false);
  const [equation, setEquation] = useState([]);
  const [equationText, setEquationText] = useState([]);
  const [blanksPos, setBlanksPos] = useState([]);


  // Action Handles

  const handleProblemStart = () => {
    setShowProblem(true);
    [eq, blPos] = generateRandomEquation(terms, blanks); 
    
    setBlanksPos(blPos);
    setEquation(eq);
    setEquationText(eq.join(' '));
  }

  const handleNumberPress = (value) => {
    if (!equation.includes('_')) {
      alert("Aperte a tecla Clear para limpar!");
    }

    const firstBlank = equation.indexOf('_');
    const updatedEquation = [...equation];
    updatedEquation[firstBlank] = value;

    setEquation(updatedEquation);
    
    const updatedEquationText = updatedEquation.join(' ');
    setEquationText(updatedEquationText);

  }

  const handleClearPress = () => {
    var updatedEquation = [...equation];
    for (var i = 0; i < blanks; i++) {
      updatedEquation[blanksPos[i]] = '_';
    }

    setEquation(updatedEquation);
    setEquationText(updatedEquation.join(' '));
  }

  const handleSubmitPress = () => {
    if (checkAnswer(equation)) {
      levels++;
    }

    if (levels > 5) {
      terms = 3;
    }
    if (levels > 7) {
      blanks = 2;
    }
  }

  // Effect Handles

  useEffect(() => {

  }, [equation])


  return(
    <div className="flex flex-col justify-center items-center">
      <div className="h-screen flex flex-col justify-center items-center pb-100 sm:pb-0">
          <div className="border-2 border-black p-4">
            Level {levels}
          </div>
          <CountdownTimer className="flex flex-col justify-center items-center" onTimerStart={handleProblemStart} level={levels}></CountdownTimer>
          {showProblem &&
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">
              {equationText}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 justify-center items-center my-5">
              <TecladoButton value={1} handleNumberPress={handleNumberPress}>1</TecladoButton>
              <TecladoButton value={2} handleNumberPress={handleNumberPress}>2</TecladoButton>
              <TecladoButton value={3} handleNumberPress={handleNumberPress}>3</TecladoButton>
              <TecladoButton value={4} handleNumberPress={handleNumberPress}>4</TecladoButton>
              <TecladoButton value={5} handleNumberPress={handleNumberPress}>5</TecladoButton>
              <TecladoButton value={6} handleNumberPress={handleNumberPress}>6</TecladoButton>
              <TecladoButton value={7} handleNumberPress={handleNumberPress}>7</TecladoButton>
              <TecladoButton value={8} handleNumberPress={handleNumberPress}>8</TecladoButton>
              <TecladoButton value={9} handleNumberPress={handleNumberPress}>9</TecladoButton>
            </div>
            <TecladoButton value={0}>0</TecladoButton> 
            <div className="flex flex-row justify-center items-center">
              <button
              className="border-2 border-black p-4 m-5 hover:bg-gray-200"
              onClick={handleClearPress}
              >Clear</button>  
              <button 
              className="border-2 border-black p-4 m-5 hover:bg-green-200"
              onClick={handleSubmitPress}
              >Submit</button>
            </div> 
            
          </div>}
      </div>
    </div>
  );
}