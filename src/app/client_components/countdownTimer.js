'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CountdownTimer({className = "", onTimerStart, scoreValue}) {
  
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {

    async function waitToLeave() {
      delay(1500);
      router.push('/');
    }
    if (!isActive) {
      return;
    } else if (timeLeft <= 0) {
      console.log("scoreValue: ", scoreValue);
      alert('Parabéns, você conseguiu ' + scoreValue + ' pontos!');
      waitToLeave()
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000)

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, scoreValue]);

  const handleStart = () => {
    setIsActive(true);
    onTimerStart();
  }

  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;

  return(
    <div className={className}>
      <div className="text-3xl my-6">
        {timeLeft > 0 ? (<span>{minutes}:{seconds.toString().padStart(2, '0')}</span>) : (<span>Acabou o tempo!</span>)}
      </div>
      {!isActive && timeLeft > 0 && (
        <button onClick={handleStart} className="border-2 border-black bg-white text-black px-4 py-2 rounded transition hover:scale-110 hover:text-white hover:bg-black">
          Começar!
        </button>
      )}
    </div>
  );
}