import React from 'react'
import ButtonSend from '../ButtonSend'
import ButtonReset from '../ButtonReset'

function SearchOfDateAndCategory({
  startDate,
  endDate,
  selectedCategory,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
  onApplyFilters, // добавлен пропс для кнопки "Применить"
  onResetFilters,
}) {
  return (
    <div className="bg-white flex flex-col p-4 rounded shadow-md mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onApplyFilters()
        }}
        className="flex flex-row items-end gap-4 justify-center"
      >
        {/* Поле "От" (начало периода) */}
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            От
          </label>
          <input
            type="date"
            value={startDate}
            min="2025-01-01"
            max="2030-12-31"
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border border-blue-300 rounded px-2 py-1 h-10"
          />
        </div>

        {/* Поле "До" (конец периода) */}
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            До
          </label>
          <input
            type="date"
            value={endDate}
            min="2025-01-01"
            max="2030-12-31"
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border border-blue-300 rounded px-2 py-1 h-10"
          />
        </div>

        {/* Выпадающий список категорий */}
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

        {/* Кнопка "Применить" — она просто визуальная, фильтрация происходит при изменении */}
        <div>
          <label className="block text-sm font-medium text-transparent mb-1">
            &nbsp;
          </label>
          {/* Кнопка submit отправляет форму и вызывает onApplyFilters */}
          <ButtonSend type="submit" />
        </div>

        {/* Кнопка сброса фильтров */}
        <div>
          <label className="block text-sm font-medium text-transparent mb-1">
            &nbsp;
          </label>
          <ButtonReset onClick={onResetFilters}>Сброс</ButtonReset>
        </div>
      </form>
    </div>
  )
}

export default SearchOfDateAndCategory
