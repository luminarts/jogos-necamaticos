"use client"
import CountdownTimer from "@/app/client_components/countdownTimer";
import { useState, useRef } from "react";


/* Coisas a fazer ainda:
- Apertar enter para dar submit

*/
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer(num1, num2, result, operator) {
  if (operator == '+') {
    if (num1 + num2 == result) {
      return true;
    }
  } else if (operator == '-') {
    if (num1 - num2 == result) {
      return true;
    }
  } else if (operator == '*') {
    if (num1 * num2 == result) {
      return true;
    }
  } else if (operator == '/') {
    if (num1 / num2 == result) {
      return true;
    }
  }

  return false;
}

export default function Equacao() {
  
  const [showProblemDiv, setProblemDiv] = useState(false);
  const [showSubmitButton, setSubmitButton] = useState(false);
  const [showScoreDiv, setScoreDiv] = useState(false);
  const [scoreValue, setScoreValue] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleTimerStart = () => {
    setProblemDiv(true);
    setSubmitButton(true);
    setScoreDiv(true);
  }

  const inputRef = useRef(null);

  const handleSubmitClick = () => {
    const number = parseInt(inputRef.current.value);
    console.log(checkAnswer(randNum1, number, randResult, randOperator1));
    if(checkAnswer(randNum1, number, randResult, randOperator1)) {
      setScoreValue(scoreValue + 1);
    }
    inputRef.current.value = '';
  }

  var randNum1 = getRandomInteger(2, 100);
  var randResult = getRandomInteger(2, 100);
  
  const operatorsArray = ['+', '-', '*', '/'];
  var randIndex = getRandomInteger(0, 3);

  var randOperator1 = operatorsArray[randIndex];

  if (randOperator1 == '*') {
    while(randResult % randNum1 != 0) {
      randNum1 = getRandomInteger(2, 100);
    }
  } else if (randOperator1 == '/') {
    while(randNum1 % randResult != 0) {
      randNum1 = getRandomInteger(2, 100);
    }
  }

  // randIndex = Math.floor(Math.random() * 3);
  // var randOperator2 = operatorsArray[randIndex]; // usar pra fazer uma linha com 3 membros da operação
  

  return (
  <div className="flex flex-col justify-center items-center">
    <div className="h-screen flex flex-col items-center justify-center pb-100 sm:pb-0">
      {showScoreDiv && 
      <div className="border-2 border-black mt-5 flex-end p-4 flex flex-col justify-center items-center">
        <p>Score</p>
        <p>{scoreValue}</p>
      </div>}
      <CountdownTimer className="flex justify-center items-center flex-col" onTimerStart={handleTimerStart} scoreValue={scoreValue}></CountdownTimer>
      <div>
        {showProblemDiv && <div className="text-4xl sm:text-6xl text-black flex flex-row">
          <div className="flex flex-row mx-5">
            <p>
              {randNum1} 
            </p>
            <p className="mx-4">
              {randOperator1}
            </p>
            <input className="border-2 border-gray-500 w-20 sm:w-30 mx-2"
            type="number"
            ref={inputRef}
            />
            = {randResult}
          </div>
        </div>}
      </div>
      {showSubmitButton &&
      <button 
      className="border-2 border-black bg-white text-black mt-5 px-4 py-2 rounded transition hover:scale-110 hover:text-white hover:bg-black"
      onClick={handleSubmitClick}
      >
        Enviar
        </button>}
    </div>
  </div>
  );
}
