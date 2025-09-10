"use client"
import { useState, useEffect } from "react";

function shuffleArray(array) {
  var currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function ShuffleOptions({answer, handleUserSelection, level}) {
  
  const [options, setOptions] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  const [selectedOption, setSelectedOption] = useState(-1);

  useEffect(() => {
    let auxOptions = [];
    let auxAnswer = [];
    auxOptions.push(shuffleArray([1, 2, 3, 4]));
    auxOptions.push(shuffleArray([1, 2, 3, 4]));
    for (var i = 0; i < answer.length; i++) {
      auxAnswer.push(answer[i] + 1);
    }
    auxOptions.push(auxAnswer);
    auxOptions = shuffleArray(auxOptions);
    setOptions(auxOptions);
  }, [answer]);

  useEffect(() => {
    setSelectedOption(-1);
  }, [level])

  const handleSelect = (index, value) => {
    setSelectedOption([index, value]);
    handleUserSelection(value);
  }

  return(
    <div className="flex flex-row justify-center items-center">
      {options.map((value, index) => (
        <button
        key={index}
        className={`border-2 border-black py-1 px-2 m-2 hover:bg-gray-300 dark:text-black ${selectedOption[0] == index ? "bg-green-500 hover:bg-green-300": "bg-black dark:bg-white"}`}
        onClick={() => handleSelect(index, value)}
        >{value}</button>
      ))}
    </div>
  );
}