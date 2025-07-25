import React from 'react'
import { useState } from 'react'
import MonthYearControl from '../../components/ui/HabitsComponent/MonthYearControl'
import AddHabit from '../../components/ui/HabitsComponent/AddHabit'

function Habits() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [habits, setHabits] = useState([]) // список привычек

  const addHabit = (title) => {
    const newHabit = { id: uuidv4(), title }
    setHabits((prev) => [...prev, newHabit])
  }

  return (
    <div className="w-full mx-auto px-8">
      <MonthYearControl
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <AddHabit onAdd={addHabit} />
      <TableHabit habits={habits} year={year} month={month} />
    </div>
  )
}

export default Habits
