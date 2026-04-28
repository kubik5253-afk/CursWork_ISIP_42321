import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Level_4({ onNext }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const squaresRef = useRef(squares);

  const winner_comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWinningMove = (squares, symbol) => {
    for (const comb of winner_comb) {
      const [a, b, c] = comb;
      const values = [squares[a], squares[b], squares[c]];
      
      if (
        values.filter(val => val === symbol).length === 2 &&
        values.includes(null)
      ) {
        return comb.find(index => squares[index] === null);
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] === null) {
      setSquares(prev => {
        const newSquares = [...prev];
        newSquares[index] = 'X';
        return newSquares;
      });
      setCurrentMove(prev => [...prev, index]);
    }
  };

  const handleClick_1 = () => {
    const isWinner = winner_comb.some(comb => 
      comb.every(index => currentMove.includes(index))
    );

    if (isWinner) {
      console.log("Победа! Вы выбрали правильные квадраты.");
      onNext(); 
    } else {
      console.log("Попробуйте еще раз.");
    }
  };

  const handleResetClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
    setSquares(Array(9).fill(null));
    setCurrentMove([]);
  };

  useEffect(() => {
    squaresRef.current = squares;
  }, [squares]);

  useEffect(() => {
    const xCount = squares.filter(s => s === 'X').length;
    const oCount = squares.filter(s => s === 'O').length;
    if (xCount > oCount) {
      const timeoutId = setTimeout(() => {
        const currentSquares = squaresRef.current;
        const newSquares = [...currentSquares];
        const playerWinMove = checkForWinningMove(newSquares, 'X');
        if (playerWinMove !== null) {
          newSquares[playerWinMove] = 'O';
        } else {
          const aiWinMove = checkForWinningMove(newSquares, 'O');
          if (aiWinMove !== null) {
            newSquares[aiWinMove] = 'O';
          } else {
            const available = newSquares
              .map((val, i) => (val === null ? i : null))
              .filter(i => i !== null);
            const randomIndex = available[Math.floor(Math.random() * available.length)];
            newSquares[randomIndex] = 'O';
          }
        }
        setSquares(newSquares);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [squares]);

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>выйграйте в крестики нолики</p>
          <h3 className="font-bold text-2xl">Крестики нолики</h3>
        </div>

        <div className="mx-1.5 my-1.5 h-111.5">
          <div className="grid grid-cols-3 p-1 h-full gap-1">
            {squares.map((val, index) => (
              <div
                key={index}
                className="h-36 w-36 bg-gray-100 flex items-center justify-center text-4xl font-bold cursor-pointer border-2 border-gray-300"
                onClick={() => handleClick(index)}
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-1 mx-1.5 my-1 p-1 h-16 flex justify-between items-center">
          <Image 
            className={`ml-2 ${isRotating ? 'animate-spin' : ''}`}
            src="/reset.png"
            alt="Описание картинки" 
            width={20}
            height={20} 
            onClick={handleResetClick}
          />
          <button 
            className="h-10 w-25 bg-[#488ddd] text-neutral-50"
            onClick={handleClick_1}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}