import React from 'react'

function ContactsModal({ isOpen, onClose }) {
  if (!isOpen) return null // если модалка закрыта — ничего не рендерим

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // клик по фону = закрытие
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-3/4 max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри окна
      >
        {/* Кнопка закрытия */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Контакты
        </h1>

        {/* Текст контактов */}
        <div className="max-h-60 overflow-y-auto text-gray-700 text-sm mb-4">
          <div className="text-center text-lg text-gray-700 space-y-3">
            <p>📍 Адрес: Moscow, Lenina st. 1</p>
            <p>✉️ Email: example@mail.ru</p>
            <p>☎️ Телефон: 123-456-78</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsModal
