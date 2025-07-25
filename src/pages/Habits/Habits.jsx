import React from 'react'
import { useState } from 'react'
import MonthYearControl from '../../components/ui/HabitsComponent/MonthYearControl'
import AddHabit from '../../components/ui/HabitsComponent/AddHabit'

function Habits() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [habits, setHabits] = useState([]) // список привычек

  return (
    <div>
      <MonthYearControl
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <AddHabit />
    </div>
  )
}

export default Habits
