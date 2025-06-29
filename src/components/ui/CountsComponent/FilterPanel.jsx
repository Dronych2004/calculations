import React from 'react'
import ButtonSend from '../ButtonSend'
import ButtonReset from '../ButtonReset'
import SearchFilteredComponent from './SearchFilteredComponent'

function FilterPanel({
  startDate,
  endDate,
  selectedCategory,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
  allCounts,
  onApplyFilters,
  onResetFilters,
}) {
  // Функция обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault() // Отменяем стандартное поведение — чтобы форма не перезагружала страницу

    // Находим ближайший родительский элемент <form> от кнопки/события
    const form = e.target.closest('form')
    if (!form) return // Если форма не найдена — ничего не делаем

    // Проверяем валидность всей формы (с учётом required, min, max и др.)
    if (!form.checkValidity()) {
      // Если есть ошибки — показываем встроенные браузерные сообщения с подсказками
      return form.reportValidity()
    }

    const filtered = allCounts.filter((item) => {
      const date = new Date(item.date)
      const validStart = startDate ? date >= new Date(startDate) : true
      const validEnd = endDate ? date <= new Date(endDate) : true
      const validCategory = selectedCategory
        ? item.category === selectedCategory
        : true
      return validStart && validEnd && validCategory
    })

    onApplyFilters(filtered)
  }

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-end gap-4 justify-center"
      >
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            От
          </label>
          <input
            type="date"
            value={startDate}
            required
            min="2025-01-01"
            max="2030-12-31"
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border border-blue-300 rounded px-2 py-1 h-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            До
          </label>
          <input
            type="date"
            value={endDate}
            required
            min="2025-01-01"
            max="2030-12-31"
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border border-blue-300 rounded px-2 py-1 h-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Категория
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="border border-blue-300 rounded px-2 py-1 h-10"
          >
            <option value="" disabled hidden>
              Выберите категорию...
            </option>
            <option value="products">Продукты</option>
            <option value="travels">Путешествия</option>
            <option value="games">Игры</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-transparent mb-1">
            &nbsp;
          </label>
          <ButtonSend />
        </div>
        <div>
          <label className="block text-sm font-medium text-transparent mb-1">
            &nbsp;
          </label>
          <ButtonReset onClick={onResetFilters}>Сброс</ButtonReset>
        </div>
        <SearchFilteredComponent />
      </form>
    </div>
  )
}

export default FilterPanel
