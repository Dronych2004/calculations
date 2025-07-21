import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import ButtonAddCount from '../../components/ui/CountsComponent/ButtonAddCount'
import PopupAddCount from '../../components/ui/CountsComponent/PopupAddCount'
import ButtonDownloadJSON from '../../components/ui/CountsComponent/ButtonDownloadJSON'
import ButtonUploadJSON from '../../components/ui/CountsComponent/ButtonUploadJSON'
import Pagination from '../../components/ui/Pagination'
import SearchOfComment from '../../components/ui/CountsComponent/SearchOfComment'
import SearchOfDateAndCategory from '../../components/ui/CountsComponent/SearchOfDateAndCategory'

function Counts() {
  // Основной массив всех записей
  const [counts, setCounts] = useState([])

  // Контроль видимости popup для добавления/редактирования
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editCount, setEditCount] = useState(null) // текущая запись для редактирования

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Фильтры даты и категории
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Поисковая строка по комментариям
  const [searchQuery, setSearchQuery] = useState('')

  // Добавление или обновление записи
  const handleAddOrUpdateCount = (count) => {
    if (editCount) {
      setCounts((prev) => prev.map((c) => (c.id === count.id ? count : c)))
    } else {
      setCounts((prev) => [...prev, count])
    }
    setIsPopupOpen(false)
    setEditCount(null)
  }

  // Открытие формы редактирования записи
  const handleEdit = (id) => {
    const countToEdit = counts.find((c) => c.id === id)
    if (countToEdit) {
      setEditCount(countToEdit)
      setIsPopupOpen(true)
    }
  }

  // Удаление записи
  const handleDelete = (id) => {
    setCounts((prev) => prev.filter((c) => c.id !== id))
  }

  // Закрытие popup без сохранения
  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setEditCount(null)
  }

  // Сброс поиска по комментарию — очищаем строку и сбрасываем страницу
  const handleResetSearch = (e) => {
    e.preventDefault()
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Сброс фильтров даты и категории — очищаем и сбрасываем страницу
  const handleResetFilters = (e) => {
    e.preventDefault()
    setStartDate('')
    setEndDate('')
    setSelectedCategory('')
    setCurrentPage(1)
  }

  // Объединённая фильтрация по дате, категории и комментарию
  const applyCombinedFilters = () => {
    return counts
      .filter((item) => {
        const date = new Date(item.date)
        const validStart = startDate ? date >= new Date(startDate) : true
        const validEnd = endDate ? date <= new Date(endDate) : true
        return validStart && validEnd
      })
      .filter((item) => {
        return selectedCategory ? item.category === selectedCategory : true
      })
      .filter((item) => {
        return item.comment?.toLowerCase().includes(searchQuery.toLowerCase())
      })
  }

  const filteredCounts = applyCombinedFilters()

  // Пагинация: определяем текущие элементы для отображения
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCounts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCounts.length / itemsPerPage)

  // Итоговая сумма отображаемых записей
  const totalSum = filteredCounts.reduce((sum, c) => sum + c.money, 0)

  return (
    <div className="bg-[whitesmoke] text-blue-500 min-h-screen py-8">
      {/* Заголовок */}
      <h1 className="text-center text-xl uppercase font-bold font-serif mb-4">
        Затраты
      </h1>

      {/* Кнопка открытия popup */}
      <ButtonAddCount onClick={() => setIsPopupOpen(true)} />

      {/* Popup добавления/редактирования */}
      {isPopupOpen && (
        <PopupAddCount
          onClose={handleClosePopup}
          onSubmit={handleAddOrUpdateCount}
          editCount={editCount}
        />
      )}

      {/* Фильтрация по дате и категории */}
      <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
        <SearchOfDateAndCategory
          startDate={startDate}
          endDate={endDate}
          selectedCategory={selectedCategory}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onCategoryChange={setSelectedCategory}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Поиск по комментарию */}
      <div className="bg-white shadow-md mb-2 max-w-4xl mx-auto mt-2 overflow-x-auto">
        <SearchOfComment
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFind={() => setCurrentPage(1)}
          onReset={handleResetSearch}
        />
      </div>

      {/* Таблица */}
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
            {currentItems.map((count, idx) => (
              <tr
                key={count.id}
                className="text-blue-600 text-sm font-serif border-t hover:bg-blue-50"
              >
                <td className="px-4 py-2 border-r text-center">
                  {indexOfFirstItem + idx + 1}
                </td>
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

        {/* Если нет записей */}
        {filteredCounts.length === 0 && (
          <p className="text-center text-sm text-blue-400 font-serif mt-6">
            Пока нет ни одной записи
          </p>
        )}
      </div>

      {/* Итоговая сумма */}
      <div className="flex justify-center mt-8">
        <div className="bg-white text-blue-600 px-4 py-2 rounded shadow-sm">
          <h1 className="text-xl font-bold font-mono tabular-nums">
            Итого:{' '}
            {totalSum.toLocaleString('ru-RU').replace(/\u00A0/g, '\u2009')} ₽
          </h1>
        </div>
      </div>

      {/* Кнопки скачивания и загрузки JSON */}
      <div className="flex flex-row mx-auto justify-center py-4 space-x-4">
        <ButtonDownloadJSON data={counts} />
        <ButtonUploadJSON onUpload={setCounts} />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default Counts
