import Image from "next/image";
import { useState } from "react";

export default function Level_11({ onNext }) {
  // Состояние для отслеживания выбранных ячеек
  const [selected, setSelected] = useState([]);
  // Состояние для анимации вращения
  const [isRotating, setIsRotating] = useState(false);
  const correct_images_1 = [182,183,184,185,186,187]
  const isEqual = JSON.stringify(correct_images_1.sort()) === JSON.stringify(selected.sort());
  // Обработчик клика по ячейке
  const handleClick = (index) => {
    setSelected(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Обработчик сброса
  const handleResetClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setSelected([]); // Сбросить выбор при сбросе
    }, 500);
  };

  // Проверка выбора (можно расширить логику)
  const handleCheck_1 = () => {
    if (isEqual) {
      onNext()
    }
  };
console.log(selected)
  return (
    <>
      <div className="border-1 border-neutral-50 mx-auto w-115 h-260 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Выделите все квадраты</p>
          <h3 className="font-bold text-2xl">64-й этаж Эмпайр-стейт-билдинг</h3>
        </div>

        {/* Сетка 10x10 с фоном car.png и прозрачными ячейками */}
        <div className="grid grid-cols-10 h-396 w-110 mx-2 bg-[url('/empaer.jpg')] bg-cover bg-center">
          {[...Array(360)].map((_, i) => (
            <div 
              key={i} 
              className="w-11 h-11 bg-transparent border border-neutral-50 flex items-center justify-center relative cursor-pointer"
              onClick={() => handleClick(i)}
            >
              {/* Визуальная индикация выбора */}
              {selected.includes(i) && (
                <div 
                  className="absolute w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                  style={{ top: '-10px', left: '-10px' }} 
                >
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
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
            onClick={handleCheck_1}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}