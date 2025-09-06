"use client"
import { useState } from "react";

export default function FunilButton({children}) {

  const [toggleClick, setToggleClick] = useState(false);


  const handleClick = () => {
    setToggleClick(!toggleClick);
  }
 

  return(
    <button className={`border-2 px-2 py-1 m-3 rounded hover:bg-black hover:text-white `}>
      {children}
    </button>
  );
}