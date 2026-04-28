import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Level_9({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = () => {
    setSelected_1([]);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleCheck_1 = () => {
 
};
  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Текст</h3>
        </div>

        <div className="grid grid-cols-4 p-1 gap-1">
        </div>

        <div className="border-t-1 mx-1.5 my-1 p-1 h-16 flex justify-between items-center">
          <Image 
            className={`ml-2 ${isRotating ? 'animate-spin' : ''}`}
            src="/reset.png"
            alt="Сбросить выбор"
            width={20}
            height={20} 
            onClick={handleResetClick}
          />
          <button 
            className="h-10 w-25 bg-[#488ddd] text-neutral-50"
            onClick={handleCheck_1}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}