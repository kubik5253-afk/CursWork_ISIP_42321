import Image from "next/image"
import { useState, useEffect } from "react";

export default function Header({ currentLevel }) { 
const [Text_Level, setText_Level] = useState('Checkbox')
console.log(Text_Level)
  useEffect(() => {
    const level = Number(currentLevel); 
    switch(level){
      case 1:
        setText_Level('Checkbox');
        break;
      case 2:
        setText_Level('Светофор');
        break;
      case 3:
        setText_Level('Гиф');
        break;
      case 4:
        setText_Level('крестики нолики');
        break;
      case 5:
        setText_Level('знак');
        break;
      case 6:
        setText_Level('круг');
        break;
      case 7:
        setText_Level('цвет');
        break;
      case 8:
        setText_Level('парковка');
        break;
      case 9:
        setText_Level('Трейд');
        break;
      case 10:
        setText_Level('Эмпайр-стейт-билдинг');
        break;
      case 11:
        setText_Level('пятнашки');
        break;
      case 12:
        setText_Level('Симон');
        break;
      default:
        setText_Level('');
    }
  }, [currentLevel]);
  return (
    <>
      <div className="flex items-center justify-center font-medium text-2xl mt-4">
        <Image 
          src="/logo.png" 
          alt="Описание картинки" 
          width={30} 
          height={30} 
        />
        <h1>I'm Not a Robot</h1>
      </div>
      <h1 className="text-gray-400 text-center">Уровень {currentLevel}: {Text_Level}</h1>
    </>
  )
}