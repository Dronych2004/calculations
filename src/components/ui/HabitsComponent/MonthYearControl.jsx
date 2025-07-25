import React from 'react'

function MonthYearControl({ month, year, setMonth, setYear }) {
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  const minYear = 2025
  const maxYear = 2030

  const handlePrevMonth = () => {
    if (month === 0) {
      if (year > minYear) {
        setMonth(11)
        setYear(year - 1)
      }
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      if (year < maxYear) {
        setMonth(0)
        setYear(year + 1)
      }
    } else {
      setMonth(month + 1)
    }
  }

  const handleSelectYear = (e) => {
    const newYear = Number(e.target.value)
    if (newYear !== year) {
      setYear(newYear)
    } else {
      // Принудительный вызов setYear даже если год не меняется
      setYear((prev) => prev)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 my-4">
      <button
        onClick={handlePrevMonth}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ⬅
      </button>

      <div className="text-lg font-bold text-black w-48 text-center">
        {monthNames[month]} {year}
      </div>

      <button
        onClick={handleNextMonth}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➡
      </button>

      <select
        value={year}
        onChange={handleSelectYear}
        className="ml-4 px-2 py-1 rounded border text-black"
      >
        {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MonthYearControl
