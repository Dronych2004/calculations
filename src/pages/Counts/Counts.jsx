import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import ButtonAddCount from '../../components/ui/CountsComponent/ButtonAddCount'
import PopupAddCount from '../../components/ui/CountsComponent/PopupAddCount'
import ButtonDownloadJSON from '../../components/ui/CountsComponent/ButtonDownloadJSON'
import ButtonUploadJSON from '../../components/ui/CountsComponent/ButtonUploadJSON'
import Pagination from '../../components/ui/Pagination'
import FilterPanel from '../../components/ui/CountsComponent/FilterPanel'
import FilterTable from '../../components/ui/CountsComponent/FilterTable'
import FilterSummary from '../../components/ui/CountsComponent/FilterSummary'
import SearchComponent from '../../components/ui/CountsComponent/SearchComponent'

function Counts() {
  const [counts, setCounts] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editCount, setEditCount] = useState(null) // объект записи, которую редактируем
  const [currentPage, setCurrentPage] = useState(1) //состояние текущей страницы (примем нумерацию с 1)
  const itemsPerPage = 10 //количество строк на странице
  // для фильтрации
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredCounts, setFilteredCounts] = useState(null)
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1)
  const [sortDirection, setSortDirection] = useState('asc') // или "desc"

  //строка поиска
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredSearchQuery, setFilteredSearchQuery] = useState('')

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

  //строка поиска по комментарию

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    setCurrentPage(1) // сбрасываем страницу
  }

  //сортировка по дате

  const sortedCounts = [...counts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
  })

  const countsSumm = counts.reduce((sum, count) => sum + count.money, 0)

  //фильтрация по поиску
  const searchedCounts = sortedCounts.filter((c) =>
    c.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage //индекс последнего элемента на текущей странице
  const indexOfFirstItem = indexOfLastItem - itemsPerPage //индекс первого элемента на текущей странице
  const currentItems = searchedCounts.slice(indexOfFirstItem, indexOfLastItem) // метод массива, который возвращает новый массив от indexOfFirstItem до indexOfLastItem (не включая последний).
  // Данные, отображаемые в таблице на текущей странице

  // Кол-во страниц
  const totalPages = Math.ceil(searchedCounts.length / itemsPerPage)
  //counts.length — это общее количество записей в массиве, itemsPerPage — сколько записей показывать на одной странице

  //FilterPanel

  const filteredCountsSumm = Array.isArray(filteredCounts)
    ? filteredCounts.reduce((sum, count) => sum + count.money, 0)
    : 0

  //страницы отфильтрованной таблицы
  const filteredIndexOfLast = currentFilteredPage * itemsPerPage
  const filteredIndexOfFirst = filteredIndexOfLast - itemsPerPage
  const currentFilteredItems = Array.isArray(filteredCounts)
    ? filteredCounts.slice(filteredIndexOfFirst, filteredIndexOfLast)
    : []

  //сброс фильтров
  const handleResetFilters = (e) => {
    if (e) e.preventDefault() // чтобы форма не отправлялась при клике, если событие есть
    setStartDate('')
    setEndDate('')
    setSelectedCategory('')
    setFilteredCounts(null) // возвращаем исходные данные
    setCurrentFilteredPage(1)
  }

  //сброс фильтра в строке поиска
  const handleReset = (e) => {
    if (e) e.preventDefault() // чтобы форма не отправлялась при клике, если событие есть
    setSearchQuery('')
    setCurrentPage(1)
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
      {/* Строка поиска */}
      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFind={handleSearch}
        onReset={handleReset}
      />

      {/* Таблица затрат */}
      <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 rounded shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-600 text-left text-sm font-bold font-serif">
              <th className="px-4 py-2 border-r">№</th>
              {/* <th className="px-4 py-2 border-r">Дата</th> */}
              <th
                className="px-4 py-2 border-r cursor-pointer"
                onClick={() =>
                  setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
              >
                Дата {sortDirection === 'asc' ? '↑' : '↓'}
              </th>

              <th className="px-4 py-2 border-r">Категория</th>
              <th className="px-4 py-2 border-r">Сумма</th>
              <th className="px-4 py-2 border-r">Комментарий</th>
              <th className="px-4 py-2 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {(filteredCounts
              ? currentFilteredItems
              : currentItems.filter((c) =>
                  c.comment?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ).map((count, index) => (
              <tr
                key={count.id}
                className="text-blue-600 text-sm font-serif border-t hover:bg-blue-50"
              >
                <td className="px-4 py-2 border-r text-center">
                  {indexOfFirstItem + index + 1}
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

        {/* Сообщение, если записей нет */}
        {(filteredCounts ? filteredCounts.length : counts.length) === 0 && (
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
        <FilterPanel
          startDate={startDate}
          endDate={endDate}
          selectedCategory={selectedCategory}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onCategoryChange={setSelectedCategory}
          allCounts={counts}
          onApplyFilters={(filtered) => {
            setFilteredCounts(filtered)
            setCurrentFilteredPage(1)
          }}
          onResetFilters={handleResetFilters}
        />
        {/* отображаем отфильтрованную таблицу */}
        {filteredCounts !== null && (
          <FilterTable
            data={currentFilteredItems}
            currentPage={currentFilteredPage}
            totalPages={Math.ceil(filteredCounts.length / itemsPerPage)}
            onPageChange={setCurrentFilteredPage}
          />
        )}
        <FilterSummary filteredCountsSumm={filteredCountsSumm} />
      </div>
    </div>
  )
}

export default Counts
