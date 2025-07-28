import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

function AddHabit({ onAdd }) {
  const [habitName, setHabitName] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!habitName.trim()) return
    setShowConfirm(true)
  }

  const confirmAdd = () => {
    onAdd(habitName.trim())
    setHabitName('')
    setShowConfirm(false)
  }

  const cancelAdd = () => {
    setShowConfirm(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center space-x-4 mb-4"
      >
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Новая привычка"
          className="px-3 py-1 border rounded w-64 text-black"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Добавить
        </button>
      </form>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={confirmAdd}
        onCancel={cancelAdd}
        message={
          <p className="text-black">
            Добавить привычку: <b>{habitName.trim()}</b>?
          </p>
        }
      />
    </>
  )
}

export default AddHabit
