"use client"
import { useState, useEffect } from "react";


export default function PiscaButton({buttonId, children, userBlinkOrder}) {

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
    userBlinkOrder.push(buttonId);
  } 



  return (
    <button
    className={`text-white p-4 hover:bg-gray-500 ${buttonClicked? 'bg-red-500' : 'bg-black'}`} 
    onClick={handleClick}
    >
      {children}
    </button>
  );
}