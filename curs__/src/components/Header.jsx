import Image from "next/image"
import { useState, useEffect } from "react";

export default function Header({ currentLevel }) { 
const [Text_Level, setText_Level] = useState('Checkbox')
  useEffect(() => {
    switch(currentLevel){
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