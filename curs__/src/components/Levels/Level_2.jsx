import Image from "next/image";
import { useState } from "react";
import Imege_capcha from "../Images_capcha_2/image_capcha";
import Imege_capcha_2 from "../Images_capcha_2/image_capcha_2";
import Imege_capcha_5 from "../Images_capcha_2/image_capcha_5";
import Imege_capcha_6 from "../Images_capcha_2/image_capcha_6";
export default function Level_2({ onNext }) {
  // Состояние для отслеживания выбранных изображений
  const [isRotating, setIsRotating] = useState(false);
  // Состояние для переключения между изображениями
  const [images_cupcha, setImagesCupcha] = useState(1);

  const handleResetClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
    setImagesCupcha(prev => ((prev % 4) + 1));
  };

  const handleCheck_1 = () => {
    if (localStorage.getItem('veri') === 'true') {
      onNext();
    } else {
      alert('не верно');
    }
  };


  const current_images_cupcha = () => {
    switch (images_cupcha) {
      case 1:
        return <Imege_capcha />;
      case 2:
        return <Imege_capcha_2 />;

      case 3:
        return <Imege_capcha_6 />;
      case 4:
        return <Imege_capcha_5 />;
      default:
        return <div>Уровень не загрузился</div>;
    }
  };

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Выберите все квадраты, с светофором</p>
          <h3 className="font-bold text-2xl">Светофор</h3>
        </div>

        {/* Контейнер с изображениями */}
        <div className="mx-1.5 my-1.5 h-111.5">
          {current_images_cupcha()}
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