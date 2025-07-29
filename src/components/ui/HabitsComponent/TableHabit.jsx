import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month + 1, 0)
  return Array.from({ length: date.getDate() }, (_, i) => i + 1)
}

function TableHabit({ habits, year, month, onEditHabit, onDeleteHabit }) {
  const daysInMonth = getDaysInMonth(year, month)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-black border-2 px-2 py-1 bg-gray-100 text-left text-red-600 font-bold">
              ПРИВЫЧКА
            </th>
            <th className="border-black border-2 px-2 py-1 bg-gray-100 text-left text-red-600 font-bold">
              ДЕЙСТВИЕ
            </th>
            {daysInMonth.map((day) => (
              <th
                key={day}
                className="border-black border-2 px-2 py-1 bg-gray-100 text-center text-red-600"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td className="border-white border-2 px-2 py-1 text-red-600">
                {habit.title}
              </td>
              <td className="border-white border-2 px-2 py-1 text-red-600">
                <button
                  onClick={() => onEditHabit(habit.id)}
                  className="text-blue-500 hover:text-yellow-500 transition ml-2"
                  title="Редактировать"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDeleteHabit(habit.id)}
                  className="text-blue-500 hover:text-red-500 transition ml-4"
                  title="Удалить"
                >
                  <Trash2 size={18} />
                </button>
              </td>
              {daysInMonth.map((day) => (
                <td
                  key={day}
                  className="border-white border-2 px-2 py-1 text-center"
                >
                  <input type="checkbox" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableHabit
