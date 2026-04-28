import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
const DrawingCanvas = ({onNext}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const center = { x: 227, y: 200 };

  // Проверка, находится ли точка внутри многоугольника
  const isPointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      const intersect = ((yi > point.y) !== (yj > point.y)) &&
        (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 455;
    canvas.height = 400;
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Рисуем центральную точку
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPoints([{ x, y }]);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setPoints(prev => [...prev, { x, y }]);
    
    if (points.length > 2) {
      const distances = points.map(p => {
        const dx = p.x - center.x;
        const dy = p.y - center.y;
        return Math.sqrt(dx * dx + dy * dy);
      });

      const averageRadius = distances.reduce((sum, d) => sum + d, 0) / distances.length;
      const deviations = distances.map(d => Math.abs(d - averageRadius));
      const maxDeviation = Math.max(...deviations);

      const maxAllowedDeviation = averageRadius * 1;
      let accuracy = Math.max(0, 100 - (maxDeviation / maxAllowedDeviation) * 100);
      accuracy = Math.min(100, Math.round(accuracy));
      setAccuracy(accuracy);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);

    // Проверка, охватывает ли рисунок центральную точку
    if (points.length >= 3) {
      const polygon = [...points, points[0]]; // Закрываем фигуру
      if (!isPointInPolygon(center, polygon)) {
        clearCanvas();
        return;
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Перерисовываем центральную точку
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    setPoints([]);
    setAccuracy(0);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

    // Состояние для отслеживания выбранных изображений
  const [isRotating, setIsRotating] = useState(false);
  // Состояние для переключения между изображениями


  const handleCheck_1 = () => {
    if (accuracy > 79) {
      onNext();
    } else {
      alert('не верно');
    }
  };
  return (
    <>
          <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
            <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
              <p>Нарисуйте круг</p>
              <h3 className="font-bold text-2xl">Наберите 80%</h3>
            </div>
    
            {/* Контейнер с изображениями */}
            <div>
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid #fff' }}
      />
      
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <strong>Точность рисования: {accuracy}%</strong>
        </div>
      
    </div>
            <div className="border-t-1 mx-1.5 mt-4 p-1 h-16 flex justify-between items-center">
              <Image 
                className={`ml-2 ${isRotating ? 'animate-spin' : ''}`}
                src="/reset.png"
                alt="Описание картинки" 
                width={20}
                height={20} 
                onClick={clearCanvas}
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
};

export default DrawingCanvas;