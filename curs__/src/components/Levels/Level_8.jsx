import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Level_8({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = () => {
    setX(60)
    setY(230)
    setRotation(90)
    setGameOver(false)
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };


  // Состояние позиции и поворота машины
  const [x, setX] = useState(60);
  const [y, setY] = useState(230);
  const [rotation, setRotation] = useState(90);
  
  // Состояние для управления движениями
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const [isTurningLeft, setIsTurningLeft] = useState(false);
  const [isTurningRight, setIsTurningRight] = useState(false);
  
  // Состояние для отслеживания проигрыша
  const [gameOver, setGameOver] = useState(false);

  // Параметры игры
  const rotationSpeed = 3; // Скорость поворота в градусах
  const moveSpeed = 3; // Скорость движения в пикселях
  const rotationRef = useRef(rotation); // Реф для угла поворота
  const moveIntervalRef = useRef(null); // Реф для интервала игры
  const gameOverRef = useRef(false); // Реф для отслеживания проигрыша

  // Определяем стенки
  const walls = [
    { x: 80, y: 65, width: 380, height: 105 }, // Верхняя длинная
    { x: 0, y: 70, width: 80, height: 45 },   // Верхняя маленькая
    { x: 0, y: 320, width: 80, height: 55 },   // Нижняя маленькая
    { x: 80, y: 280, width: 185, height: 100 }, // Нижняя центральная
    { x: 338, y: 280, width: 190, height: 100 }, // Нижняя правая
    { x: 270, y: 380, width: 65, height: 10 }, // Нижняя
  ];
 
  // Обновляем реф угла поворота
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Обновляем реф состояния игры
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // Обработчик событий клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setIsMovingForward(true);
          break;
        case "ArrowDown":
          setIsMovingBackward(true);
          break;
        case "ArrowLeft":
          setIsTurningLeft(true);
          break;
        case "ArrowRight":
          setIsTurningRight(true);
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setIsMovingForward(false);
          break;
        case "ArrowDown":
          setIsMovingBackward(false);
          break;
        case "ArrowLeft":
          setIsTurningLeft(false);
          break;
        case "ArrowRight":
          setIsTurningRight(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Проверка коллизии с учётом вращённого хитбокса
  const isCollision = (newX, newY) => {
    const halfWidth = 20; // 40 / 2
    const halfHeight = 40; // 80 / 2
    const rad = (rotationRef.current * Math.PI) / 180;

    // Четыре угла хитбокса (в локальных координатах)
    const corners = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight }
    ];

    // Рассчитываем координаты углов после поворота
    const rotatedCorners = corners.map(corner => {
      const rotatedX = corner.x * Math.cos(rad) - corner.y * Math.sin(rad);
      const rotatedY = corner.x * Math.sin(rad) + corner.y * Math.cos(rad);
      return {
        x: newX + rotatedX,
        y: newY + rotatedY
      };
    });

    // Проверяем, попал ли хотя бы один угол в стену
    return rotatedCorners.some(corner => {
      return walls.some(wall => {
        return (
          corner.x >= wall.x &&
          corner.x <= wall.x + wall.width &&
          corner.y >= wall.y &&
          corner.y <= wall.y + wall.height
        );
      });
    });
  };

  // Основной игровой цикл
  useEffect(() => {
    const gameLoop = () => {
      // Если игра окончена, останавливаем цикл
      if (gameOverRef.current) {
        clearInterval(moveIntervalRef.current);
        return;
      }

      // Обновляем поворот только при движении
      if (isMovingForward || isMovingBackward) {
        let newRotation = rotationRef.current;
        
        // Инвертируем повороты при движении назад
        if (isMovingBackward) {
          if (isTurningLeft) {
            newRotation = (rotationRef.current + rotationSpeed) % 360;
          }
          if (isTurningRight) {
            newRotation = (rotationRef.current - rotationSpeed) % 360;
          }
        } else {
          if (isTurningLeft) {
            newRotation = (rotationRef.current - rotationSpeed) % 360;
          }
          if (isTurningRight) {
            newRotation = (rotationRef.current + rotationSpeed) % 360;
          }
        }
        
        // Обновляем реф и состояние только при изменении угла
        if (newRotation !== rotationRef.current) {
          rotationRef.current = newRotation;
          setRotation(newRotation);
        }
      }
      
      // Обновляем позицию с проверкой коллизии
      if (isMovingForward || isMovingBackward) {
        const rad = ((rotationRef.current - 90) * Math.PI) / 180;
        const dx = Math.cos(rad) * moveSpeed;
        const dy = Math.sin(rad) * moveSpeed;
        
        // Рассчитываем новую позицию
        let newX = x + (isMovingForward ? dx : isMovingBackward ? -dx : 0);
        let newY = y + (isMovingForward ? dy : isMovingBackward ? -dy : 0);
        
        // Проверяем коллизию со стенками
        if (isCollision(newX, newY)) {
          // Если столкнулись - завершаем игру
          setGameOver(true);
          clearInterval(moveIntervalRef.current);
          return;
        }
        
        // Ограничиваем позицию в пределах игрового поля (450x455)
        const maxX = 450 - 30; // 420 (центрированный хитбокс)
        const maxY = 455 - 45; // 410 (центрированный хитбокс)
        newX = Math.max(30, Math.min(newX, maxX));
        newY = Math.max(45, Math.min(newY, maxY));
        
        // Обновляем позицию
        setX(newX);
        setY(newY);
      }
    };

    moveIntervalRef.current = setInterval(gameLoop, 16);
    return () => clearInterval(moveIntervalRef.current);
  }, [isMovingForward, isMovingBackward, isTurningLeft, isTurningRight, x, y]);

  const handleCheck_1 = () => {
    if (((x > 290 & x < 310) & (y > 317 & y < 340) & gameOver == false)) {
      onNext();
    }
  };
  console.log(x, y)
  return (
    <>
      
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Припаркуйтесь</p>
          <h3 className="font-bold text-2xl">Парковка</h3>
        </div>
        {gameOver && (
        <div className="position absolute ml-44 text-rose-500 font-bold">
          Вы проиграли
        </div>
      )}
        <div className="">
          {/* Отображаем сообщение о проигрыше */}
          
          <div style={{ 
            position: "relative", 
            width: "450px", 
            height: "455px", 
            overflow: "hidden"
          }}>
            {/* Фон дороги */}
            <Image
              className="ml-2 mr-2 pt-10.5"
              src="/road.webp"
              alt="Фон дороги"
              width={800}
              height={800}
            />
            {/* текстуры машины */}
            <Image
              className="position absolute left-14 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            
            />
            <Image
              className="position absolute left-29 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            
            />
            <Image
              className="position absolute left-44 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            
            />
            <Image
              className="position absolute left-59 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-75 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-90 top-24 rotate-90"
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />



            <Image
              className="position absolute left-14 top-74 rotate-270 "
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-29 top-74 rotate-270 "
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-45 top-74 rotate-270 "
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-74 top-74 rotate-270 "
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            <Image
              className="position absolute left-90 top-74 rotate-270 "
              src="/car_11.png"
              alt="текстуры машины"
              width={120}
              height={120}
            />
            {/* Стенки */}
            {walls.map((wall, index) => (
              <div key={index} style={{ 
                position: "absolute",
                left: `${wall.x}px`,
                top: `${wall.y}px`,
                width: `${wall.width}px`,
                height: `${wall.height}px`,
                opacity: 0.5,
                zIndex: 1,
              }} />
            ))}
            
            {/* Хитбокс машины (60x90, вращается) */}
            <div style={{ 
              position: "absolute",
              left: `${x - 20}px`,
              top: `${y - 45}px`,
              width: "40px",
              height: "80px",
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center center",
              opacity: 0.3,
              zIndex: 2
            }} />
            
            {/* Машина (центрированная, вращается) */}
            <div style={{ 
              position: "absolute", 
              left: `${x - 30}px`, 
              top: `${y - 45}px`,
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center center"
            }}>
              <Image
                src="/Car_10.png"
                alt="Машина"
                width={60}
                height={90}
              />
            </div>
            
            {/* Дополнительная машина (декоративная) */}
            
          </div>
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