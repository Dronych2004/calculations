import React from 'react'
import ModalWrapper from '../ModalWrapper'

/**
 * Универсальный диалог подтверждения.
 *
 * Props:
 * - isOpen (bool) — открыто ли окно
 * - onConfirm (func) — функция при подтверждении
 * - onCancel (func) — функция при отмене / закрытии
 * - title (string) — заголовок окна
 * - message (string|JSX) — сообщение с текстом
 * - confirmText (string) — текст кнопки подтверждения (по умолчанию "Да")
 * - cancelText (string) — текст кнопки отмены (по умолчанию "Отмена")
 */
function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Подтверждение',
  message,
  confirmText = 'Да',
  cancelText = 'Отмена',
}) {
  if (!isOpen) return null

  return (
    <ModalWrapper onClose={onCancel}>
      <div className="p-4 max-w-sm">
        <h2 className="text-lg font-bold mb-3 text-red-600 text-center">
          {title}
        </h2>
        <div className="mb-6 text-red-600">{message}</div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ConfirmDialog
