import { useState } from "react";

export default function Mirror() {
  
  // Mirror game, checking if image is symmetrical or not
  
  const [isMirrored, setIsMirrored] = useState(false);
  
  setIsMirrored(Math.floor(Math.random()) > 0.5 ? true : false);

  
  
  return(
    <div className="flex flex-col">
      <div className="h-screen flex flex-row justify-center items-center">
        <div className="flex flex-1">Grid 1</div>
        <div className="flex flex-0 border-2">linha vertical</div>
        <div className="flex flex-1">Grid 2</div>
      </div>
    </div>
  );
}