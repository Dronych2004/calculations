import React, { useState, useEffect } from 'react'

function AddHabit({ onAdd, onEdit, editHabit, setEditHabit }) {
  const [habitName, setHabitName] = useState('')

  // Если выбран editHabit — подставляем его в input
  useEffect(() => {
    if (editHabit) {
      setHabitName(editHabit.title)
    }
  }, [editHabit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!habitName.trim()) return

    if (editHabit) {
      onEdit(habitName) // Обновляем привычку
      setEditHabit(null) // Закрываем режим редактирования
    } else {
      onAdd(habitName) // Добавляем новую привычку
    }

    setHabitName('') // Очищаем поле
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder={editHabit ? 'Изменить привычку на...' : 'Новая привычка'}
        className="px-3 py-1 border rounded w-64 text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        {editHabit ? 'Сохранить' : 'Добавить'}
      </button>
      {editHabit && (
        <button
          type="button"
          onClick={() => {
            setEditHabit(null)
            setHabitName('')
          }}
          className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
        >
          Отмена
        </button>
      )}
    </form>
  )
}

export default AddHabit
