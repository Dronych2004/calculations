import React from 'react'
import NavMenu from './NavMenu'

function Header() {
  return (
    <header className="bg-blue-600 text-white p-3 flex flex-col items-center space-y-2">
      {/* Центрируем логотип и заголовок по центру всей ширины */}
      <div className="w-full max-w-5xl flex items-center justify-center space-x-4 px-4">
        <img
          src="/logo.png"
          alt="Логотип"
          className="h-14 w-14 object-contain drop-shadow-[0_0_2px_black]"
        />
        <h1 className="text-white text-2xl uppercase font-bold drop-shadow-[0_0_2px_black]">
          Трекинг затрат и привычек
        </h1>
      </div>

      {/* Меню растягивается на всю ширину, но выравнивание внутри — строго по центру */}
      <div className="w-full max-w-5xl px-4">
        <NavMenu />
      </div>
    </header>
  )
}

export default Header
