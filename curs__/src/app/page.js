// my-app/src/app/page.js
'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Level_1 from '@/components/Levels/Level_1';
import Level_2 from '@/components/Levels/Level_2';
import Level_3 from '@/components/Levels/Level_3';
import Level_4 from '@/components/Levels/Level_4';
import Level_5 from '@/components/Levels/Level_5';
import Level_6 from '@/components/Levels/Level_6';
import Level_7 from '@/components/Levels/Level_7';
import Level_8 from '@/components/Levels/Level_8';
import Level_9 from '@/components/Levels/Level_9';
import Level_10 from '@/components/Levels/Level_10';
import Level_11 from '@/components/Levels/Level_11';
import Level_12 from '@/components/Levels/Level_12';


export default function Page() {
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel) {
      setCurrentLevel(parseInt(savedLevel, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentLevel', currentLevel);
  }, [currentLevel]);

  const handleNextLevel = () => {
    setCurrentLevel(prev => prev + 1);
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return <Level_1 onNext={handleNextLevel} />;
      case 2:
        return <Level_2 onNext={handleNextLevel} />;
      case 3:
        return <Level_3 onNext={handleNextLevel} />;
      case 4:
        return <Level_4 onNext={handleNextLevel}/>;
      case 5:
        return <Level_5 onNext={handleNextLevel}/>;
      case 6:
        return <Level_6 onNext={handleNextLevel}/>;
      case 7:
        return <Level_7 onNext={handleNextLevel}/>;
      case 8:
        return <Level_8 onNext={handleNextLevel}/>;
      case 9:
        return <Level_9 onNext={handleNextLevel}/>;
      case 10:
        return <Level_10 onNext={handleNextLevel}/>;
      case 11:
        return <Level_11 onNext={handleNextLevel}/>;
      case 12:
        return <Level_12 onNext={handleNextLevel}/>;

      default:
        return <div>Уровень не найден</div>;
    }
  };

  const Reset_Level = () => {
    setCurrentLevel(1); 
    localStorage.setItem('currentLevel', 1); 
  }
    
  return (
    <div>
      <Header currentLevel={currentLevel} />
      {renderLevel()}
      <button 
        onClick={Reset_Level} 
        className="fixed bottom-0 right-0 mb-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50"
      >
        Reset
      </button>
    </div>
  );
}