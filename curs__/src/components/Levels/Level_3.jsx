import Image from "next/image";
import { useState, useEffect } from "react";

export default function Level_3({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);
  const [currentImages, setCurrentImages] = useState(0);
  const [correctTextCapcha, setcorrectTextCapcha] = useState('')
  const [inputText, setInputText] = useState('')

  const handleResetClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
    
    setCurrentImages(prev => (prev + 1) % 4)
  };

  let gif_images = [
    '/g1.gif',
    '/g2.gif',
    '/g3.gif',
    '/g4.gif',
  ];
  useEffect(() => {
    switch(currentImages){
      case 0:
        setcorrectTextCapcha('corndog');
        break;
      case 1:
        setcorrectTextCapcha('j3k5xn');
        break;
      case 2:
        setcorrectTextCapcha('samjolteon');
        break;
      case 3:
        setcorrectTextCapcha('de83jwe');
        break;
      default:
        setcorrectTextCapcha('');
    }
  }, [currentImages]);
const examin = () => {
  if (correctTextCapcha === inputText.toLowerCase()) { 
    onNext()
  }
}


console.log(currentImages)
console.log(correctTextCapcha)
console.log(inputText)
  return (
    <>
      <div className="h-70 w-130 border-1 border-gray-300 mx-auto  shadow-2xl mt-5 px-5" >
        <p className="my-1.5">Введите текст ниже</p>
        <div className="position : relative">
          <Image 
            src={gif_images[currentImages]}
            alt="Описание картинки" 
            width={600}
            height={160}  
          />
          <Image 
              src="/reset.png"
              alt="Описание картинки" 
              width={17}
              height={17} 
              className={`ml-2 position : absolute bottom-2 right-2 ${isRotating ? 'animate-spin' : ''}`}
              onClick={handleResetClick}
            />
        </div>
        <div className="mt-4 flex justify-between">
          <input className="h-10 w-70 border-1 p-2 font-medium border-gray-300 " type="text" placeholder="Ответ" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={examin} className="h-10 w-25 border-1 bg-[#488ddd] text-neutral-50 border-gray-300 active:bg-[#2b6fbd]">Проверить</button>
        </div>
      </div> 
    </>
  );
}