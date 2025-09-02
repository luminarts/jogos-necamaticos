"use client"
import CountdownTimer from "@/app/client_components/countdownTimer";
import TecladoButton from "../client_components/TecladoButton";
import { useState, useEffect } from "react";


/* Coisas a fazer ainda:
  - colocar sempre multiplicação no primeiro depois da fase 10
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

  // gerando equação
  for (var i = 0; i < 2*terms + 1; i+=2) {
    var num = getRandomInteger(2, 9);
    var op;
    var result = 0;

    if (i <= 1) {
      op = operatorsArray[getRandomInteger(0, 2)];
    } else {
      op = operatorsArray[getRandomInteger(0, 1)];
    }
    
    if (i == 2*terms) {
      equation[i - 1] = '=';

      // calculate result
      result = equation[0];
      for (var j = 1; j < equation.length - 2; j+=2) {
        switch (equation[j]) {
          case "+":
            result += equation[j + 1];
            break;
          case "-":
            result -= equation[j + 1];
            break;
          case "*":
            result *= equation[j + 1];
            break;
          default:
        }
      }
      equation[i] = result;
      

    } else {
      
      equation[i] = num;
      equation[i + 1] = op;
    }
  }

  for (var i = 0; i < blanks; i++) {
    equation[blanksPos[i]] = '_';
  }

  return [equation, blanksPos];
}
// num op num op num = result

function checkAnswer(equation) {
  var expectedResult = equation[equation.length - 1];
  var userResult = equation[0];
  for (var i = 1; i < equation.length - 2; i+=2) {
    switch (equation[i]) {
      case "+":
        userResult += equation[i + 1];
        break;
      case "-":
        userResult -= equation[i + 1];
        break;
      case "*":
        userResult *= equation[i + 1];
        break;
      default:
    }
  }

  return Math.abs(expectedResult - userResult) <= 2;
}

export default function Equacao() {
  // Variables and states
  var terms = 2, blanks = 1, eq, blPos;
  const [showProblem, setShowProblem] = useState(false);
  const [equation, setEquation] = useState([]);
  const [equationText, setEquationText] = useState([]);
  const [blanksPos, setBlanksPos] = useState([]);
  const [level, setLevel] = useState(1);
  const [toggleMinus, setToggleMinus] = useState(false);

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
  
    updatedEquation[firstBlank] = toggleMinus? -value : value;

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
    setToggleMinus(false);
    if (checkAnswer(equation)) {
      setLevel(level + 1);
    }
  }

  const handleToggleMinus = () => {
    setToggleMinus(!toggleMinus);
  }

  // Effect Handles

  // Every level change
  useEffect(() => {
    
    if (level > 5) {
      terms = 3;
    }
    if (level > 7) {
      blanks = 2;
    }
    
    
    [eq, blPos] = generateRandomEquation(terms, blanks); 
    
    setBlanksPos(blPos);
    setEquation(eq);
    setEquationText(eq.join(' '));
  }, [level])


  return(
    <div className="flex flex-col justify-center items-center">
      <div className="h-screen flex flex-col justify-center items-center pb-100 sm:pb-0">
          <div className="border-2 border-black p-4">
            Level {level}
          </div>
          <CountdownTimer className="flex flex-col justify-center items-center" onTimerStart={handleProblemStart} level={level}></CountdownTimer>
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
              <button  onClick={handleToggleMinus} className={`${toggleMinus? 'bg-black text-white' : 'bg-gray-100'} border-2 border-black rounded p-3 hover:bg-black hover:text-white`}>-</button>
              <TecladoButton value={0} handleNumberPress={handleNumberPress}>0</TecladoButton> 
              <button className="bg-gray-100 border-2 border-black rounded p-3 hover:bg-black hover:text-white">.</button>
            </div>
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