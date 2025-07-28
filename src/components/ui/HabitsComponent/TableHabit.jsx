import React from 'react'

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month + 1, 0)
  return Array.from({ length: date.getDate() }, (_, i) => i + 1)
}

function TableHabit({ habits, year, month }) {
  const daysInMonth = getDaysInMonth(year, month)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-max border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-100 text-left text-red-600 font-bold">
              Привычка
            </th>
            {daysInMonth.map((day) => (
              <th
                key={day}
                className="border px-2 py-1 bg-gray-100 text-center text-red-600"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td className="border px-2 py-1 text-red-600">{habit.title}</td>
              {daysInMonth.map((day) => (
                <td key={day} className="border px-2 py-1 text-center">
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
