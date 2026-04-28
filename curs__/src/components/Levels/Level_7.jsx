import Image from "next/image";
import { useState } from "react";

export default function Level_7({ onNext }) {
  const [selected_1, setSelected_1] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = () => {
    setSelected_1([]);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleClick_1 = (index) => {
    setSelected_1(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCheck_1 = () => {
  const correctIndex = [9]; // Теперь это массив
  if (JSON.stringify(correctIndex.sort()) === JSON.stringify(selected_1.sort())) {
    onNext();
  }
};

  const Colors = [
    ['#ec55f1'], ['#ec55f1'], ['#ec55f1'], ['#ec55f1'],
    ['#ec55f1'], ['#ec55f1'], ['#ec55f1'], ['#ec55f1'],
    ['#ec55f1'], ['#f565fa'],
    ['#ec55f1'], ['#ec55f1'], ['#ec55f1'], ['#ec55f1'],
    ['#ec55f1'], ['#ec55f1']
  ];

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Выберите квадрат другого цвета</p>
          <h3 className="font-bold text-2xl">Проверка зрения</h3>
        </div>

        <div className="grid grid-cols-4 p-1 gap-1">
          {Colors.map((color, index) => (
            <div 
              key={index} 
              className="h-27 relative cursor-pointer"
              onClick={() => handleClick_1(index)}
              style={{ backgroundColor: color[0] }}
            >
              {selected_1.includes(index) && (
                <div 
                  className="absolute w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center"
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