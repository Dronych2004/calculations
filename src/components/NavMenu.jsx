import { NavLink } from 'react-router-dom'

function NavMenu() {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-yellow-300 bg-opacity-80 rounded-xl p-2 shadow-[0_0_12px_rgba(255,255,255,0.7)]">
      <ul className="flex space-x-6 justify-center">
        <li>
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 bg-white border border-blue-600 rounded px-3 py-1 font-bold font-serif'
                : 'text-white bg-blue-600 rounded px-3 py-1 hover:bg-blue-700 transition-colors font-serif'
            }
          >
            РАСЧЁТЫ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="habits"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 bg-white border border-blue-600 rounded px-3 py-1 font-bold font-serif'
                : 'text-white bg-blue-600 rounded px-3 py-1 hover:bg-blue-700 transition-colors font-serif'
            }
          >
            ПРИВЫЧКИ
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavMenu
