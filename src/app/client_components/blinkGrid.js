"use client"
import { useState, useEffect } from "react";

export default function blinkGrid({handleClickOrder}) {
  const [gridSize, setGridSize] = useState(2);
  const [isClicked, setIsClicked] = useState(false);
  const [clickOrder, setClickOrder] = useState([]);

  const handleButtonClick = (row, col) => {
    const buttonId = `${row}-${col}`;
    var auxClickOrder = [...clickOrder];
    setIsClicked(true);

    if(!auxClickOrder.includes(buttonId)) {
      auxClickOrder.push(buttonId);
    } else {
      alert("Botão já clicado");
    }

    setClickOrder(auxClickOrder);

    handleClickOrder(clickOrder);
  }

  const renderGrid = () => {
    const buttons = [];
    for (var row = 0; row < gridSize; row++) {
      for (var col = 0; col < gridSize; col++) {
        const buttonId = `${row}-${col}`;
        buttons.push(
          <button
            key={buttonId}
            onClick={() => handleButtonClick(row, col)}
            className={`border-2 border-black ${isClicked ? 'bg-green-500' : 'bg-gray-200'}`}

          >

          </button>
        )
      }
    }
  }
  
  return buttons;
}