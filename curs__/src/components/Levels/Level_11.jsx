import Image from "next/image";
import { useState, useEffect } from "react";

// Функция для генерации случайной разметки (не гарантирует решаемость)
// Генерирует гарантированно решаемую комбинацию путём случайных ходов из собранного состояния
function generateInitialGrid() {
  // Начальное собранное состояние: [0, 1, 2, 3, 4, 5, 6, 7, null]
  // null — пустая клетка, индексы 0-8 соответствуют позициям в сетке 3x3
  let grid = [0, 1, 2, 3, 4, 5, 6, 7, null];
  
  let emptyIndex = 8; // Пустая клетка изначально в конце (индекс 8)
  let previousIndex = -1; // Чтобы избегать немедленных возвратных ходов

  // Делаем достаточное количество случайных легальных ходов для хорошего перемешивания
  // 100-200 ходов обычно достаточно для 3x3 пазла
  const shuffleSteps = 150;

  for (let step = 0; step < shuffleSteps; step++) {
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    const possibleMoves = [];

    // Собираем все возможные ходы (соседние клетки по вертикали и горизонтали)
    if (row > 0) possibleMoves.push(emptyIndex - 3); // Вверх
    if (row < 2) possibleMoves.push(emptyIndex + 3); // Вниз
    if (col > 0) possibleMoves.push(emptyIndex - 1); // Влево
    if (col < 2) possibleMoves.push(emptyIndex + 1); // Вправо

    // Исключаем обратный ход, чтобы перемешивание было эффективнее
    const validMoves = possibleMoves.filter(idx => idx !== previousIndex);
    
    // Если все ходы отфильтровались (крайний случай), берём любой возможный
    const moveCandidates = validMoves.length > 0 ? validMoves : possibleMoves;
    
    // Выбираем случайный ход из доступных
    const randomMove = moveCandidates[Math.floor(Math.random() * moveCandidates.length)];
    
    // Меняем местами пустую клетку и выбранную плитку
    [grid[emptyIndex], grid[randomMove]] = [grid[randomMove], grid[emptyIndex]];
    
    // Обновляем позиции для следующей итерации
    previousIndex = emptyIndex;
    emptyIndex = randomMove;
  }

  return grid;
}

export default function Level_12({ onNext }) {
  const [isRotating, setIsRotating] = useState(true); // Анимация сработает 1 раз
  const [grid, setGrid] = useState(generateInitialGrid());

  const images_1 = [
    "/Stop/stop1.jpg",
    "/Stop/stop2.jpg",
    "/Stop/stop3.jpg",
    "/Stop/stop4.jpg",
    "/Stop/stop5.jpg",
    "/Stop/stop6.jpg",
    "/Stop/stop7.jpg",
    "/Stop/stop8.jpg",
  ];
  const solvedGrid = [0, 1, 2, 3, 4, 5, 6, 7, null]; 
  const handleCheck_1 = () => {

    if (grid.toString() === solvedGrid.toString()) {
      onNext();
    } else {
      alert('не собран')
    }
  };
  console.log(grid.toString())
  console.log(solvedGrid.toString())
  // Анимация 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRotating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleResetClick = () => {
    // Анимация сброса отключена
    setGrid(generateInitialGrid());
  };

  const handleClick = (index) => {
    const emptyIndex = grid.indexOf(null);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newGrid = [...grid];
      [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
      setGrid(newGrid);
    }
  };

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Текст</h3>
        </div>

        <div className="grid grid-cols-3 p-1 gap-1 h-110">
          {grid.map((tile, index) => (
            <div
              key={index}
              className={`w-36 h-36 border border-gray-300 flex items-center justify-center cursor-pointer 
                transition-transform duration-300 ease-in-out
                ${tile === null ? 'bg-gray-200' : ''}`}
              onClick={() => handleClick(index)}
            >
              {tile !== null && (
                <Image
                  src={images_1[tile]}
                  alt={`Tile ${tile}`}
                  width={144}
                  height={144}
                  className="object-cover rounded-md shadow-sm"
                />
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