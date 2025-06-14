import React, { useState } from 'react'
import ButtonAddCount from '../../components/ui/CountsComponent/ButtonAddCount'
import PopupAddCount from '../../components/ui/CountsComponent/PopupAddCount'

function Counts() {
  const [counts, setCounts] = useState([])

  // состояние для открытия/закрытия popup
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Приём нового объекта count
  const handleAddCount = (newCount) => {
    setCounts((prev) => [...prev, newCount])
  }

  return (
    <div className="bg-[whitesmoke] text-blue-500">
      <h1 className="py-2 mx-auto w-max uppercase font-bold font-serif">
        Затраты
      </h1>

      {/* кнопка открывает popup */}
      <ButtonAddCount onClick={() => setIsPopupOpen(true)} />

      {/* popup отображается только когда isPopupOpen === true */}
      {isPopupOpen && (
        <PopupAddCount
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddCount}
        />
      )}
      {/* Отображение списка записей */}
      <div className="max-w-md mx-auto mt-8 space-y-4">
        {counts.map((count) => (
          <div
            key={count.id}
            className="bg-white border border-blue-200 p-4 rounded shadow-sm"
          >
            <div className="text-sm text-blue-600 font-serif">
              <strong>Дата:</strong> {count.date}
            </div>
            <div className="text-sm text-blue-600 font-serif">
              <strong>Категория:</strong> {count.category}
            </div>
            <div className="text-sm text-blue-600 font-serif">
              <strong>Сумма:</strong> {count.money.toLocaleString('ru-RU')} ₽
            </div>
            {count.comment && (
              <div className="text-sm text-blue-600 font-serif">
                <strong>Комментарий:</strong> {count.comment}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Counts
