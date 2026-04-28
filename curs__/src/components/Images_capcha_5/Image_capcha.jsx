import { useState,useEffect } from "react";
import Image from "next/image";
export default function Imege_capcha() {
      const [selected_1, setSelected_1] = useState([]);
      let images_1 = [
  "/Znak_1/znak_1.jpg",
  "/Znak_1/znak_2.jpg",
  "/Znak_1/znak_3.jpg",
  "/Znak_1/znak_4.jpg",
  "/Znak_1/znak_5.jpg",
  "/Znak_1/znak_6.jpg",
  "/Znak_1/znak_7.jpg",
  "/Znak_1/znak_8.jpg",
  "/Znak_1/znak_9.jpg",
  "/Znak_1/znak_10.jpg",
  "/Znak_1/znak_11.jpg",
  "/Znak_1/znak_12.jpg",
  "/Znak_1/znak_13.jpg",
  "/Znak_1/znak_14.jpg",
  "/Znak_1/znak_15.jpg",
  "/Znak_1/znak_16.jpg",
];
  
  let correct_images_1 = [10, 11, 14, 15, 2, 3, 6, 7]

    const handleClick_1 = (index) => {
    setSelected_1(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index) // Удалить из выбранных
        : [...prev, index] // Добавить в выбранные
    );
};

  const isEqual = JSON.stringify(correct_images_1.sort()) === JSON.stringify(selected_1.sort());
      console.log(localStorage.getItem('veri'))
     if (isEqual) {
      console.log('все выбраны');
      localStorage.setItem('veri', true)
    } else {
     console.log('не все выбраны');
    }
  console.log(selected_1)
  useEffect(() => {
      localStorage.setItem('veri', false);
    }, [false]);
    return(
        <div className="grid grid-cols-4 p-1 h-full">
            {images_1.map((src, index) => (
                <div 
                    key={index}
                    className={`cursor-pointer 
                    ${selected_1.includes(index) ? 'scale-80' : ''} 
                    relative`} // Добавлен relative для позиционирования
                    onClick={() => handleClick_1(index)
                    }
                    >
                    {/* Основное изображение */}
                    <Image
                        src={src}
                        alt={`Изображение ${index + 1}`}
                        width={111}
                        height={111}
                        className="object-contain border-2 "     
                    />
                        
                    {/* Визуальная индикация выбора */}
                    {selected_1.includes(index) && (
                        <div 
                            className="absolute w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center"
                            style={{ top: '-10px', left: '-10px' }} // Точные значения позиционирования
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
    )
} 