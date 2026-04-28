import Image from "next/image";
import { useState, useEffect } from "react";
import styles from './Level_12.module.css'; // Импорт стилей
export default function Level_12({ onNext }) {
    //кастомный курсор
      const [position, setPosition] = useState({ x: 0, y: 0 });
    
      // Скрытие стандартного курсора
      useEffect(() => {
        const originalCursor = document.documentElement.style.cursor;
        document.documentElement.style.cursor = 'none';
    
        return () => {
          document.documentElement.style.cursor = originalCursor; // Восстановление
        };
      }, []);
    
      // Обновление позиции кастомного курсора
      useEffect(() => {
        const updatePosition = (e) => {
          setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
      }, []);
    

  // Состояние для отслеживания выбранных изображений
  const [isRotating, setIsRotating] = useState(false);
  // Состояние для переключения между изображениями
  const handleResetClick = () => {
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
        <div 
      className={styles['custom-cursor']} // Применение локальных стилей
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img src="/custom-cursor.png" alt="custom cursor" />
    </div>
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Утки</h3>
        </div>

        {/* Контейнер с изображениями */}
        <div className="mx-1.5 my-1.5 h-111.5 grid grid-cols-3 gap-2 p-2">
  {[...Array(9)].map((_, i) => (
    <div 
  key={i} 
  className="aspect-square bg-white border border-gray-300 rounded-sm relative"
>
  <Image 
    className="mx-auto my-4"
    src="/duck.png" // Путь к вашему изображению
    alt="утка" 
    width={100}
    height={100} 
  />
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