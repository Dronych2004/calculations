import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ModalWrapper from '../ModalWrapper'
import ButtonSend from '../ButtonSend'
import ButtonCancel from '../ButtonCancel'

function PopupAddCount({ onClose, onSubmit }) {
  const [rawAmount, setRawAmount] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    setRawAmount(rawValue)
    setDisplayAmount(rawValue ? Number(rawValue).toLocaleString('ru-RU') : '')
  }

  const handleDateChange = (e) => setDate(e.target.value)

  const handleCategoryChange = (e) => setCategory(e.target.value)

  const handleCommentChange = (e) => setComment(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target.closest('form')
    if (!form) return
    if (!form.checkValidity()) return form.reportValidity()
    console.log('Отправляем:', Number(rawAmount), date)

    const newCount = {
      id: uuidv4(),
      date,
      category,
      money: Number(rawAmount),
      comment,
    }

    onSubmit?.(newCount) // Передаём объект в родительский компонент
    handleCancel() // Очищаем форму и закрываем popup
  }

  // Очищаем форму и закрываем окно
  const handleCancel = () => {
    setRawAmount('')
    setDisplayAmount('')
    setDate('')
    setCategory('')
    setComment('')
    onClose?.()
  }

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="w-[350px] flex flex-col justify-center mx-auto"
      >
        <h1 className="text-center uppercase text-blue-600 font-serif font-bold py-4">
          Внесение затрат
        </h1>

        {/* Дата */}
        <div className="text-blue-600 text-sm font-serif flex flex-row items-center justify-center mx-auto py-2">
          <h2 className="uppercase">выбрать дату</h2>
          <div className="ml-4">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              min="2025-01-01"
              max="2100-12-31"
              className="border rounded px-2 py-1 text-blue-600"
            />
          </div>
        </div>

        {/* Категория */}
        <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
          <h2 className="uppercase py-2 text-center">выберите категорию</h2>
          <select
            className="w-[250px] py-2 border rounded"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled hidden>
              Категория...
            </option>
            <option value="products">Продукты</option>
            <option value="travels">Путешествия</option>
            <option value="games">Игры</option>
          </select>
        </div>

        {/* Сумма */}
        <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
          <label htmlFor="amount" className="uppercase py-2 text-center">
            Затраты / руб.
          </label>
          <input
            id="amount"
            type="text"
            placeholder="0"
            value={displayAmount}
            onChange={handleChange}
            className="w-[165px] py-2 px-3 border rounded text-center text-lg text-blue-600 border-blue-600 bg-blue-50 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
            inputMode="numeric"
            required
          />
        </div>

        {/* Комментарий */}
        <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
          <label htmlFor="comment" className="uppercase py-2 text-center">
            Комментарий
          </label>
          <textarea
            id="comment"
            rows="3"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Введите комментарий..."
            className="w-[250px] py-2 px-3 border rounded text-blue-600 border-blue-600 bg-blue-50 font-serif focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 resize-none"
          ></textarea>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end space-x-4 mt-6">
          <ButtonCancel onClick={handleCancel} />
          <button type="submit">
            <ButtonSend />
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default PopupAddCount
