import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Level_9({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const [isTurningLeft, setIsTurningLeft] = useState(false);
  const [isTurningRight, setIsTurningRight] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [x, setX] = useState(60);
  const [y, setY] = useState(130);
  const [rotation, setRotation] = useState(90);
  const [car11Y, setCar11Y] = useState(0); // Новое состояние для позиции car_11
  const [car11Direction, setCar11Direction] = useState('down'); // Направление движения car_11

  const rotationRef = useRef(rotation);
  const moveIntervalRef = useRef(null);
  const gameOverRef = useRef(false);
  const car11YRef = useRef(car11Y); // Реф для позиции car_11

  const rotationSpeed = 3;
  const moveSpeed = 3;

  const walls = [
    { x: 365, y: 50, width: 100, height: 320, rotated: 8 },
  ];

  // Обновление рефов
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    car11YRef.current = car11Y;
  }, [car11Y]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp": setIsMovingForward(true); break;
        case "ArrowDown": setIsMovingBackward(true); break;
        case "ArrowLeft": setIsTurningLeft(true); break;
        case "ArrowRight": setIsTurningRight(true); break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp": setIsMovingForward(false); break;
        case "ArrowDown": setIsMovingBackward(false); break;
        case "ArrowLeft": setIsTurningLeft(false); break;
        case "ArrowRight": setIsTurningRight(false); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Анимация car_11
  useEffect(() => {
    const animateCar11 = () => {
      setCar11Y(prev => {
        let newY = prev;
        if (car11Direction === 'down') {
          newY = prev + 2;
          if (newY >= 400) setCar11Direction('up');
        } else {
          newY = prev - 2;
          if (newY <= 0) setCar11Direction('down');
        }
        return newY;
      });
    };

    const interval = setInterval(animateCar11, 16);
    return () => clearInterval(interval);
  }, [car11Direction]);

  // Основной игровой цикл
  useEffect(() => {
    const gameLoop = () => {
      if (gameOverRef.current) return;

      // Обновление угла поворота
      if (isMovingForward || isMovingBackward) {
        let newRotation = rotationRef.current;
        if (isMovingBackward) {
          if (isTurningLeft) newRotation = (rotationRef.current + rotationSpeed) % 360;
          if (isTurningRight) newRotation = (rotationRef.current - rotationSpeed) % 360;
        } else {
          if (isTurningLeft) newRotation = (rotationRef.current - rotationSpeed) % 360;
          if (isTurningRight) newRotation = (rotationRef.current + rotationSpeed) % 360;
        }
        if (newRotation !== rotationRef.current) {
          rotationRef.current = newRotation;
          setRotation(newRotation);
        }
      }

      // Обновление позиции
      if (isMovingForward || isMovingBackward) {
        const rad = ((rotationRef.current - 90) * Math.PI) / 180;
        const dx = Math.cos(rad) * moveSpeed;
        const dy = Math.sin(rad) * moveSpeed;
        let newX = x + (isMovingForward ? dx : isMovingBackward ? -dx : 0);
        let newY = y + (isMovingForward ? dy : isMovingBackward ? -dy : 0);

        // Проверка коллизий
        if (isCollision(newX, newY)) {
          setGameOver(true);
          return;
        }

        // Ограничение позиции
        const maxX = 450 - 30;
        const maxY = 455 - 45;
        newX = Math.max(30, Math.min(newX, maxX));
        newY = Math.max(45, Math.min(newY, maxY));
        setX(newX);
        setY(newY);
      }
    };

    moveIntervalRef.current = setInterval(gameLoop, 16);
    return () => clearInterval(moveIntervalRef.current);
  }, [isMovingForward, isMovingBackward, isTurningLeft, isTurningRight, x, y]);

  // Проверка коллизий
  const isCollision = (newX, newY) => {
    const halfWidth = 20;
    const halfHeight = 40;
    const rad = (rotationRef.current * Math.PI) / 180;

    // Хитбокс основной машины
    const corners = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight }
    ];

    const rotatedCorners = corners.map(corner => {
      const rotatedX = corner.x * Math.cos(rad) - corner.y * Math.sin(rad);
      const rotatedY = corner.x * Math.sin(rad) + corner.y * Math.cos(rad);
      return {
        x: newX + rotatedX,
        y: newY + rotatedY
      };
    });

    // Проверка коллизий со стенами
    const wallCollision = rotatedCorners.some(corner => 
      walls.some(wall => 
        corner.x >= wall.x && 
        corner.x <= wall.x + wall.width && 
        corner.y >= wall.y && 
        corner.y <= wall.y + wall.height
      )
    );

    // Проверка коллизий с car_11
    const car11Hitbox = {
      x: 44, // Центрированная позиция
      y: car11YRef.current,
      width: 120,
      height: 120
    };

    const carHitbox = {
      x: newX - halfWidth,
      y: newY - halfHeight,
      width: 40,
      height: 80
    };

    const car11Collision = (
      carHitbox.x < car11Hitbox.x + car11Hitbox.width &&
      carHitbox.x + carHitbox.width > car11Hitbox.x &&
      carHitbox.y < car11Hitbox.y + car11Hitbox.height &&
      carHitbox.y + carHitbox.height > car11Hitbox.y
    );

    return wallCollision || car11Collision;
  };

  const handleResetClick = () => {
    setX(60);
    setY(230);
    setRotation(90);
    setGameOver(false);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleCheck_1 = () => {
    if (x > 290 && x < 310 && y > 317 && y < 340 && !gameOver) {
      onNext();
    }
  };

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Припаркуйтесь</p>
          <h3 className="font-bold text-2xl">Парковка</h3>
        </div>
        {gameOver && (
          <div className="absolute ml-44 text-rose-500 font-bold">
            Вы проиграли
          </div>
        )}
        <div style={{ 
          position: "relative", 
          width: "450px", 
          height: "455px", 
          overflow: "hidden"
        }}>
          <Image
            className="ml-2 mr-2"
            src="/bg_2.png"
            alt="Фон дороги"
            width={800}
            height={900}
          />
          
          {/* Стенки */}
          {walls.map((wall, index) => (
            <div key={index} style={{ 
              position: "absolute",
              left: `${wall.x}px`,
              top: `${wall.y}px`,
              width: `${wall.width}px`,
              height: `${wall.height}px`,
              transform: `rotate(${wall.rotated}deg)`,
              opacity: 0.5,
              zIndex: 1,
              backgroundColor: "rgba(255, 0, 0, 0.3)",
            }} />
          ))}
          
          {/* Хитбокс основной машины */}
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
          
          {/* Основная машина */}
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
          
          {/* Движущаяся машина car_11 */}
          <div style={{ 
            position: "absolute",
            left: "44px",
            top: `${car11Y}px`,
            width: "120px",
            height: "120px",
            transform: "rotate(90deg)",
            zIndex: 3
          }}>
            <Image
              src="/car_11.png"
              alt="Движущаяся машина"
              width={120}
              height={120}
            />
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