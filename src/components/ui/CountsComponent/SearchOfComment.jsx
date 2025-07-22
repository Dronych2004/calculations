import React, { useState, useEffect } from 'react'
import ButtonFind from '../ButtonFind'
import ButtonReset from '../ButtonReset'

function SearchOfComment({ searchQuery, onFind, onReset }) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Синхронизируем локальное состояние с пропом searchQuery (если он меняется извне)
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    onFind(localQuery) // Передаём текущее локальное значение поиска
  }

  const handleReset = () => {
    setLocalQuery('') // Очистка локального поля
    onReset() // Сброс в родителе
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center gap-2 py-4"
    >
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)} // Меняем локальный стейт при вводе
        placeholder="Поиск по комментарию"
        className="border border-blue-300 rounded px-2 py-1"
      />
      <ButtonFind type="submit" />
      <ButtonReset onClick={handleReset}>Сброс поиска</ButtonReset>
    </form>
  )
}

export default SearchOfComment
