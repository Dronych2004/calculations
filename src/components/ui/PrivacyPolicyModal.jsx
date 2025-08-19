import { useState } from 'react'

function PrivacyPolicyModal({ isOpen, onClose }) {
  const [isChecked, setIsChecked] = useState(false) // состояние для чекбокса

  if (!isOpen) return null // если модалка закрыта — ничего не рендерим

  const handleAgree = () => {
    alert('Спасибо, вы согласились ✅')
    setIsChecked(false) // сбрасываем чекбокс
    onClose() // закрываем модалку
  }

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

        <h2 className="text-xl font-bold mb-4">Политика конфиденциальности</h2>

        {/* Текст */}
        <div className="max-h-60 overflow-y-auto text-gray-700 text-sm mb-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eleifend, orci nec bibendum dictum, nisl eros ultrices nibh, vitae
            tincidunt justo felis sed lorem. Vivamus vel arcu sit amet magna
            posuere cursus. Integer dictum erat non eros euismod, id aliquet
            ligula bibendum.
          </p>
          <p className="mt-2">
            Morbi vehicula, libero sed luctus porta, justo neque sollicitudin
            neque, vitae interdum nulla lorem a nunc. Cras eget tincidunt
            sapien. Sed sed ex vitae elit scelerisque varius.
          </p>
        </div>

        {/* Чекбокс */}
        <div className="flex items-center mb-4">
          <input
            id="agree"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700 text-sm">
            Я прочитал и согласен с политикой конфиденциальности
          </label>
        </div>

        {/* Кнопка */}
        <button
          disabled={!isChecked}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isChecked
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleAgree}
        >
          Я согласен
        </button>
      </div>
    </div>
  )
}

export default PrivacyPolicyModal
