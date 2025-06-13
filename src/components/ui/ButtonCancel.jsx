import React from 'react'

function ButtonCancel({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-blue-600 bg-white border border-blue-600 rounded text-sm px-2 py-2 uppercase font-bold font-serif shadow-md hover:shadow-lg active:bg-blue-50 active:shadow-sm transition-all duration-100"
    >
      Отмена
    </button>
  )
}

export default ButtonCancel
