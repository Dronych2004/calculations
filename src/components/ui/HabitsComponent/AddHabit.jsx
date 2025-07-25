import React, { useState } from 'react'

function AddHabit({ addHabbit }) {
  const [input, setInput] = useState('')

  const handleAddHabbit = () => {
    addHabbit(input)
    setInput('')
  }
  return (
    <div className="my-4 text-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Добавить привычку"
        className="border rounded px-2 py-1 mr-2 text-black"
      />
      <button
        onClick={handleAddHabbit}
        className="bg-blue-600 text-white px-3 py-1 rounded font-serif"
      >
        ДОБАВИТЬ
      </button>
    </div>
  )
}

export default AddHabit
