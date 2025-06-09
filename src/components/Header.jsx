import React from 'react'
import NavMenu from './NavMenu'

function Header() {
  return (
    <header className="bg-blue-600 text-white p-6 flex flex-col space-y-4">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        {/* Логотип слева */}
        <img
          src="/logo.png"
          alt="Логотип"
          className="h-14 w-14 object-contain"
        />
        {/* Заголовок справа от логотипа */}
        <h1 className="text-white text-2xl uppercase font-bold">
          Трекинг затрат и привычек
        </h1>
      </div>
      <div className="container mx-auto">
        <NavMenu />
      </div>
    </header>
  )
}

export default Header
