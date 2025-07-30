import React from 'react'
import { useState } from 'react'
import MonthYearControl from '../../components/ui/HabitsComponent/MonthYearControl'

import AddHabit from '../../components/ui/HabitsComponent/AddHabit'
import TableHabit from '../../components/ui/HabitsComponent/TableHabit'
import AddHabit from '../../components/ui/HabitsComponent/AddHabit'
import { v4 as uuidv4 } from 'uuid'
import ConfirmDialog from '../../components/ui/HabitsComponent/ConfirmDialog'

function Habits() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [habits, setHabits] = useState([]) // список привычек

  //редактирование привычек
  const [editHabit, setEditHabit] = useState(null)
  const [isConfirmDialogIsOpen, setIsConfirmDialogIsOpen] = useState(false)
  const [habitToDelete, setHabitToDelete] = useState(null)

  const addHabit = (title) => {
    const newHabit = { id: uuidv4(), title }
    setHabits((prev) => [...prev, newHabit])
  }

  // Открыть привычку для редактирования
  const handleEditHabit = (id) => {
    const habitToEdit = habits.find((c) => c.id === id)
    setEditHabit(habitToEdit)
  }

  // Удалить запись о привычке
  const handleDeleteHabit = (id) => {
    const habit = habits.find((h) => h.id === id)
    setHabitToDelete(habit)
    setIsConfirmDialogIsOpen(true)
  }

  const handleConfirmDeleteHabit = () => {
    setHabits((prev) => prev.filter((h) => h.id !== habitToDelete.id))
    setHabitToDelete(null)
    setIsConfirmDialogIsOpen(false)
  }

  const updateHabit = (newTitle) => {
    if (!editHabit) return
    setHabits((prev) =>
      prev.map((h) => (h.id === editHabit.id ? { ...h, title: newTitle } : h))
    )
    setEditHabit(null)
  }

  return (
    <div className="w-full mx-auto px-8">
      <MonthYearControl
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        onEditHabit={handleEditHabit}
        onDeleteHabit={handleDeleteHabit}
      />
      <AddHabit
        onAdd={addHabit}
        editHabit={editHabit}
        setEditHabit={setEditHabit}
        onEdit={updateHabit}
      />

      <TableHabit
        habits={habits}
        year={year}
        month={month}
        onEditHabit={handleEditHabit}
        onDeleteHabit={handleDeleteHabit}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogIsOpen}
        onConfirm={handleConfirmDeleteHabit}
        onCancel={() => setIsConfirmDialogIsOpen(false)}
        message={
          <p className="text-black">
            Удалить привычку: <b>{habitToDelete?.title}</b>?
          </p>
        }
      />
    </div>
  )
}

export default Habits
