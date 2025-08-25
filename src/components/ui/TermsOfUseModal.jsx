import React from 'react'

function TermsOfUseModal({ isOpenTermsOfUseModal, onCloseTermsOfUseModal }) {
  if (!isOpenTermsOfUseModal) return null // если модалка закрыта — ничего не рендерим

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onCloseTermsOfUseModal} // клик по фону = закрытие
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-3/4 max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри окна
      >
        {/* Кнопка закрытия */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onCloseTermsOfUseModal}
        >
          ✖
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Условия использования
        </h1>

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
      </div>
    </div>
  )
}

export default TermsOfUseModal
