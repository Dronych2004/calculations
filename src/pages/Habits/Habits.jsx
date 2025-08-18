import React from 'react'
import { useState } from 'react'
import MonthYearControl from '../../components/ui/HabitsComponent/MonthYearControl'
import TableHabit from '../../components/ui/HabitsComponent/TableHabit'
import AddHabit from '../../components/ui/HabitsComponent/AddHabit'
import { v4 as uuidv4 } from 'uuid'
import ConfirmDialog from '../../components/ui/HabitsComponent/ConfirmDialog'
import ButtonDownloadHabbitsJSON from '../../components/ui/HabitsComponent/ButtonDownloadHabbitsJSON'
import ButtonUploadHabbitsJSON from '../../components/ui/HabitsComponent/ButtonUploadHabbitsJSON'

function Habits() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [habits, setHabits] = useState([]) // список привычек

  //редактирование привычек
  const [editHabit, setEditHabit] = useState(null)
  const [isConfirmDialogIsOpen, setIsConfirmDialogIsOpen] = useState(false)
  const [habitToDelete, setHabitToDelete] = useState(null)

  const addHabit = (title) => {
    const days = new Date(year, month + 1, 0).getDate() // сколько дней в текущем месяце
    const newHabit = {
      id: uuidv4(),
      title,
      checks: Array(days).fill(false), // массив на количество дней месяца
    }
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
    if (!habitToDelete) return
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

  // функция для клика по чекбоксу
  const toggleCheck = (habitId, dayIndex) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate() // кол-во дней месяца
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const newChecks = [...h.checks]
          // если массив короче, добавляем пустые значения
          while (newChecks.length < daysInMonth) newChecks.push(false)
          newChecks[dayIndex] = !newChecks[dayIndex] // меняем значение чекбокса
          return { ...h, checks: newChecks }
        }
        return h
      })
    )
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
        toggleCheck={toggleCheck} // передаем в таблицу
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

      {/* Кнопки скачивания и загрузки JSON */}
      <div className="flex flex-row mx-auto justify-center py-4 space-x-4">
        <ButtonDownloadHabbitsJSON data={habits} />
        <ButtonUploadHabbitsJSON onUpload={setHabits} />
      </div>
    </div>
  )
}

export default Habits
