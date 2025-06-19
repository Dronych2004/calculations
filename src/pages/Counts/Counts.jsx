import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import ButtonAddCount from '../../components/ui/CountsComponent/ButtonAddCount'
import PopupAddCount from '../../components/ui/CountsComponent/PopupAddCount'
import ButtonDownloadJSON from '../../components/ui/CountsComponent/ButtonDownloadJSON'
import ButtonUploadJSON from '../../components/ui/CountsComponent/ButtonUploadJSON'

function Counts() {
  const [counts, setCounts] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editCount, setEditCount] = useState(null) // объект записи, которую редактируем
  const [currentPage, setCurrentPage] = useState(1) //состояние текущей страницы (примем нумерацию с 1)
  const itemsPerPage = 10 //количество строк на странице

  // Добавление новой записи
  const handleAddCount = (newCount) => {
    setCounts((prev) => [...prev, newCount])
  }

  // Удаление записи
  const handleDelete = (id) => {
    setCounts((prev) => prev.filter((count) => count.id !== id))
  }

  // Добавление новой записи или обновление существующей
  const handleAddOrUpdateCount = (count) => {
    if (editCount) {
      // Обновление записи по id
      setCounts((prev) => prev.map((c) => (c.id === count.id ? count : c)))
    } else {
      // Добавление новой записи
      setCounts((prev) => [...prev, count])
    }
    setIsPopupOpen(false)
    setEditCount(null)
  }

  // Редактирование записи — открыть popup и заполнить поля
  const handleEdit = (id) => {
    const countToEdit = counts.find((c) => c.id === id)
    if (!countToEdit) return
    setEditCount(countToEdit)
    setIsPopupOpen(true)
  }

  // Закрытие popup и сброс редактирования
  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setEditCount(null)
  }

  const countsSumm = counts.reduce((sum, count) => sum + count.money, 0)

  // Индексы текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage //индекс последнего элемента на текущей странице
  const indexOfFirstItem = indexOfLastItem - itemsPerPage //индекс первого элемента на текущей странице
  const currentItems = counts.slice(indexOfFirstItem, indexOfLastItem) // метод массива, который возвращает новый массив от indexOfFirstItem до indexOfLastItem (не включая последний). Данные, отображаемые в таблице на текущей странице

  // Кол-во страниц
  const totalPages = Math.ceil(counts.length / itemsPerPage)
  //counts.length — это общее количество записей в массиве, itemsPerPage — сколько записей показывать на одной странице

  // Переключение страниц
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
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
          onClose={handleClosePopup}
          onSubmit={handleAddOrUpdateCount}
          editCount={editCount}
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
            {currentItems.map((count, index) => (
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
      <div className="flex justify-center mt-8">
        <div className="bg-white text-blue-600 px-4 py-2 rounded shadow-sm">
          <h1 className="text-xl font-bold font-mono tabular-nums">
            Итого:{' '}
            {countsSumm.toLocaleString('ru-RU').replace(/\u00A0/g, '\u2009')} ₽
          </h1>
        </div>
      </div>
      <div className="flex flex-row mx-auto justify-center py-4">
        <ButtonDownloadJSON data={counts} />
        <ButtonUploadJSON onUpload={setCounts} />
      </div>

      {/* Пагинация */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Counts
