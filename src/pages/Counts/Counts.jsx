import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import ButtonAddCount from '../../components/ui/CountsComponent/ButtonAddCount'
import PopupAddCount from '../../components/ui/CountsComponent/PopupAddCount'

function Counts() {
  const [counts, setCounts] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Добавление новой записи
  const handleAddCount = (newCount) => {
    setCounts((prev) => [...prev, newCount])
  }

  // Удаление записи
  const handleDelete = (id) => {
    setCounts((prev) => prev.filter((count) => count.id !== id))
  }

  // Заглушка под редактирование
  const handleEdit = (id) => {
    console.log('Редактировать запись с id:', id)
    // Можно реализовать popup редактирования аналогично добавлению
  }

  return (
    <div className="bg-[whitesmoke] text-blue-500 min-h-screen py-8">
      <h1 className="text-center text-xl uppercase font-bold font-serif mb-4">
        Затраты
      </h1>

      {/* Кнопка открытия popup */}
      <ButtonAddCount onClick={() => setIsPopupOpen(true)} />

      {/* Popup для добавления */}
      {isPopupOpen && (
        <PopupAddCount
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddCount}
        />
      )}

      {/* Таблица затрат */}
      <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 rounded shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-600 text-left text-sm font-bold font-serif">
              <th className="px-4 py-2 border-r">№</th>
              <th className="px-4 py-2 border-r">Дата</th>
              <th className="px-4 py-2 border-r">Категория</th>
              <th className="px-4 py-2 border-r">Сумма</th>
              <th className="px-4 py-2 border-r">Комментарий</th>
              <th className="px-4 py-2 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {counts.map((count, index) => (
              <tr
                key={count.id}
                className="text-blue-600 text-sm font-serif border-t hover:bg-blue-50"
              >
                <td className="px-4 py-2 border-r text-center">{index + 1}</td>
                <td className="px-4 py-2 border-r">{count.date}</td>
                <td className="px-4 py-2 border-r">{count.category}</td>
                <td className="px-4 py-2 border-r text-right">
                  {count.money.toLocaleString('ru-RU')} ₽
                </td>
                <td className="px-4 py-2 border-r">
                  {count.comment?.trim() || '-'}
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(count.id)}
                    className="text-blue-500 hover:text-yellow-500 transition"
                    title="Редактировать"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(count.id)}
                    className="text-blue-500 hover:text-red-500 transition"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Сообщение, если записей нет */}
        {counts.length === 0 && (
          <p className="text-center text-sm text-blue-400 font-serif mt-6">
            Пока нет ни одной записи
          </p>
        )}
      </div>
    </div>
  )
}

export default Counts
