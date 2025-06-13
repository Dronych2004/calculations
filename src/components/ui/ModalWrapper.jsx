import React, { useEffect, useRef } from 'react'

function ModalWrapper({ children, onClose }) {
  const wrapperRef = useRef(null)

  // Закрытие по клику вне окна
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={wrapperRef} className="relative bg-white rounded shadow-xl p-4">
        {/* Крестик закрытия */}
        <button
          onClick={() => onClose?.()}
          className="absolute top-2 right-2 text-xl font-bold text-blue-600 hover:text-red-500"
          aria-label="Закрыть"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
