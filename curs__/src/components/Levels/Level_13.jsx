import { useState, useEffect, useRef } from "react";

export default function Level_9({ onNext }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [color, setColor] = useState("#fff");
  const [activClick, setActivClick] = useState(false);
  const [userSequence, setUserSequence] = useState([]);
  const timeoutRef = useRef(null);

  // Генерация уникальной последовательности для текущего уровня
  const [correctSequence, setCorrectSequence] = useState(() => {
    const indices = [...Array(25).keys()].sort(() => Math.random() - 0.5);
    return indices.slice(0, 3); // 3 уникальных индекса для уровня 3
  });

  const [levelNumber, setLevelNumber] = useState(3); // Начальный уровень

  const colors = [
    "#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#a133ff",
    "#33fff5", "#f5ff33", "#ff8c33", "#8c33ff", "#33ff8c",
    "#ff3333", "#33ff33", "#3333ff", "#ffff33", "#ff33ff",
    "#33ffff", "#ff9933", "#9933ff", "#33ff99", "#99ff33",
    "#ff3399", "#3399ff", "#99ff33", "#ff6633", "#6633ff"
  ];

  // Отображение последовательности при старте уровня
  useEffect(() => {
    const timeouts = [];

    correctSequence.forEach((cell, index) => {
      timeouts.push(
        setTimeout(() => {
          setSelectedCell(cell);
          setColor(colors[cell]);
        }, (index + 1) * 1000)
      );
    });

    timeouts.push(
      setTimeout(() => {
        setSelectedCell(null);
        setActivClick(true);
      }, (correctSequence.length + 1) * 1000)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [correctSequence]);

  // Обработка кликов по ячейкам
  const colorClick = (i) => {
    if (activClick) {
      const newSequence = [...userSequence, i];
      setUserSequence(newSequence);
      setSelectedCell(i);
      setColor(colors[i]);

      const isCorrectUpToNow = newSequence.every((val, index) => val === correctSequence[index]);

      if (!isCorrectUpToNow) {
        // Ошибка: сброс уровня к начальному состоянию
        setColor("red");
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");
          setUserSequence([]);
          
          // Генерация новой начальной последовательности
          const indices = [...Array(25).keys()].sort(() => Math.random() - 0.5);
          const newInitialSequence = indices.slice(0, 3);
          setCorrectSequence(newInitialSequence);
          setLevelNumber(3); // Сброс уровня
          setActivClick(false);
        }, 500);
      } else if (newSequence.length === correctSequence.length) {
        // Уровень пройден
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");

          if (levelNumber < 6) {
            // Генерация новой последовательности для следующего уровня
            const indices = [...Array(25).keys()].sort(() => Math.random() - 0.5);
            const newSequence = indices.slice(0, levelNumber + 1);
            setCorrectSequence(newSequence);
            setLevelNumber(levelNumber + 1);
            setUserSequence([]);
            setActivClick(false);
          } else {
            onNext(); // Завершение игры
          }
        }, 500);
      } else {
        // Промежуточная проверка
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="border-1 rounded-2xl bg-[#1a1a1a] border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#2a2a2a] m-3 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Уровень {levelNumber}</h3>
        </div>

        <div className="ml-6 mr-5 my-1.5 h-105 w-105 grid grid-cols-5 grid-rows-5">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`bg-[#3e3e3e] h-19 w-19 gap-1 rounded-sm ${activClick ? "hover:bg-[#6c6c6c]" : ""}`}
              style={{ backgroundColor: selectedCell === i ? color : "" }}
              onClick={() => colorClick(i)}
            />
          ))}
        </div>

        <div className="border-b-neutral-200 bg-[#222222] mx-1.5 p-1 h-16 flex flex-row-reverse items-center">
          <button
            className="h-10 w-25 bg-[#333333] rounded-xl text-neutral-50"
            onClick={() => {}}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}