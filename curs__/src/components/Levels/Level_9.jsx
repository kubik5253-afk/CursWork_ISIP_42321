import Image from "next/image";
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Level_10({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Цена',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });
  const [currentPrice, setCurrentPrice] = useState(100); // Текущая цена
  const [balance, setBalance] = useState(200)
  const [stockCount, setStockCount] = useState(0)
  const handleResetClick = () => {
    setBalance(200)
    setStockCount(0)

    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleCheck_1 = () => {
    if (balance >= 250){
      onNext()
    }
  };

  useEffect(() => {
    let labels = [];
    let price = 100; // Начальная цена
    setCurrentPrice(price); // Установка начальной цены

    labels.push(-5); // Начинаем с -5
    setChartData({
      labels,
      datasets: [
        {
          label: 'Цена',
          data: [price],
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    });

    let counter = -4;
    const interval = setInterval(() => {
      const change = Math.random() * 20 - 10; // от -10 до +10
      price += change;
      price = Math.max(0, price); // ✅ Цена не может быть меньше 0
      setCurrentPrice(price);

      setChartData(prev => ({
        labels: [...prev.labels, counter++],
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, price],
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const Bye = () => {
  if (balance >= currentPrice) {
    setBalance(prev => prev - currentPrice);
    setStockCount(prev => prev + 1);
  } else {
    alert("Недостаточно средств для покупки!");
  }
};

const sell = () => {
  if(stockCount){
    setBalance(prev => prev + currentPrice)
    setStockCount(prev => prev - 1);
  }else {
    alert("Акций нет");
  }
}
  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Заработайте 50 р</p>
          <h3 className="font-bold text-2xl">Трейд</h3>
        </div>

        {/* Контейнер с графиком */}
        <div className="mx-1.5 my-1.5 h-111.5 overflow-visible">
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              plugins: {
                legend: { 
                  display: true,
                  onClick: null 
                },
                title: { text: 'Динамика цены' },
                afterDraw: (chart) => {
                  if (chart.data.datasets.length === 0) return;
                  
                  const ctx = chart.ctx;
                  const dataset = chart.data.datasets[0];
                  const meta = chart.getDatasetMeta(0);
                  
                  if (meta.data.length === 0) return;
                  
                  const lastPoint = meta.data[meta.data.length - 1];
                  const price = dataset.data[dataset.data.length - 1];
                  
                  ctx.fillStyle = 'rgba(75,192,192,1)';
                  ctx.font = '12px Arial';
                  ctx.textAlign = 'right';
                  ctx.textBaseline = 'top';
                  
                  const x = lastPoint.x + 5;
                  const y = lastPoint.y - 5;
                }
              },
              scales: {
                x: { 
                  type: 'linear',
                  display: false,
                  title: { display: false, text: 'Время' },
                  ticks: {
                    callback: function(value, index) {
                      return index % 3 === 0 ? this.getLabelForValue(value) : '';
                    }
                  },
                  min: chartData.labels.length > 6 ? chartData.labels[chartData.labels.length - 6] : undefined,
                  max: chartData.labels.length > 0 ? chartData.labels[chartData.labels.length - 1] : undefined
                },
                y: { 
                  title: { display: true, text: 'Цена' },
                  beginAtZero: false
                }
              }
            }}
          />
          {/* ✅ Отображение текущей цены под графиком */}
        <div className="text-center mt-2">
          <p className="font-bold text-lg">Текущая цена: {Math.round(currentPrice)} руб.</p>
        </div>
        <div className="text-center mt-5">
          <p className="font-bold text-lg">Баланс: {Math.round(balance)} руб.</p>
        </div>

        <div className="text-center mt-5">
          <p className="font-bold text-lg">Акций: {Math.round(stockCount)}.</p>
        </div>

          <div className="flex items-center justify-evenly mt-10">
        <button onClick={Bye} className="p-2 bg-emerald-600 rounded-2xl text-amber-50">Купить</button>
        <button onClick={sell} className="p-2 bg-red-500 rounded-2xl text-amber-50">Продать</button>
          </div>

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

      <style jsx>{`
        .overflow-visible {
          overflow: visible !important;
        }
      `}</style>
    </>
  );
}