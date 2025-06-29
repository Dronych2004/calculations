import React from 'react'
import ButtonFind from '../ButtonFind'
import ButtonReset from '../ButtonReset'

function SearchComponent({ searchQuery, setSearchQuery, onFind, onClick }) {
  return (
    <div className="flex flex-row justify-center gap-2 py-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // обновляем состояние при вводе
        placeholder="Поиск по комментарию"
        className="border border-blue-300 rounded px-2 py-1"
      />
      <ButtonFind onClick={onFind} />
      <ButtonReset onClick={onClick}>Сброс поиска</ButtonReset>
    </div>
  )
}

export default SearchComponent
