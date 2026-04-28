import { useState,useEffect } from "react";
import Image from "next/image";
export default function Imege_capcha() {
      const [selected_1, setSelected_1] = useState([]);
      let images_1 = [
    "/Svet_1/Svetofor_1.jpg",
    "/Svet_1/Svetofor_2.jpg",
    "/Svet_1/Svetofor_3.jpg",
    "/Svet_1/Svetofor_4.jpg",
    "/Svet_1/Svetofor_5.jpg",
    "/Svet_1/Svetofor_6.jpg",
    "/Svet_1/Svetofor_7.jpg",
    "/Svet_1/Svetofor_8.jpg",
    "/Svet_1/Svetofor_9.jpg",
    "/Svet_1/Svetofor_10.jpg",
    "/Svet_1/Svetofor_11.jpg",
    "/Svet_1/Svetofor_12.jpg",
    "/Svet_1/Svetofor_13.jpg",
    "/Svet_1/Svetofor_14.jpg",
    "/Svet_1/Svetofor_15.jpg",
    "/Svet_1/Svetofor_16.jpg",
  ];
  
  let correct_images_1 = [5,6,8,9,10,12,13,14]

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