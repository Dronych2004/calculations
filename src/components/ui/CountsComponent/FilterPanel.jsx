import React from 'react'
import ButtonSend from '../ButtonSend'

function FilterPanel({
  startDate,
  endDate,
  selectedCategory,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
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

    // Если все поля валидны — здесь можно выполнить логику фильтрации/отправки
    // Например, вызвать callback, отправить данные, изменить состояние и т.п.
    // Пока этого нет — просто можно вывести в консоль
    console.log('Форма валидна, можно применить фильтры')
  }
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-4 max-w-full mx-auto"
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
              Категория...
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
      </form>
    </div>
  )
}

export default FilterPanel
