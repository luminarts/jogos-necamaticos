"use client"
import { useState } from "react";

export default function TecladoButton({value, children, handleNumberPress}) {

  const handleClick = () => {
    handleNumberPress(value);
  }

  return(
    <div>
      <button value={value}
      className="bg-gray-100 border-2 border-black rounded p-3 hover:bg-black hover:text-white"
      onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}