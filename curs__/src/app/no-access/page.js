// my-app/src/app/not-found.js
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Доступ запрещён</h1>
      <p className="mt-4">У вас нет прав для просмотра этой страницы.</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Вернуться на главную
      </a>
    </div>
  );
}