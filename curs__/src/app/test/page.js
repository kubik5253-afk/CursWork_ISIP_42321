// my-app/src/app/test/page.js
'use client'; // Важно: делает компонент клиентским

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Test() {
  const router = useRouter();

  useEffect(() => {
    // Проверка значения в localStorage
    const allowed = localStorage.getItem('currentLevel') === '1';

    if (!allowed) {
      // Перенаправление, если доступ запрещён
      router.push('/no-access');
    }
  }, [router]);

  return <h1>тест</h1>;
}