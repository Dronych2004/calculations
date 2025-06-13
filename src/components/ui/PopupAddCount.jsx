// import React, { useState } from 'react'
// import ButtonSend from '../ui/ButtonSend'
// import ButtonCancel from '../ui/ButtonCancel'

// function PopupAddCount() {
//   // Состояния для суммы (raw и отображаемая) и даты
//   const [rawAmount, setRawAmount] = useState('')
//   const [displayAmount, setDisplayAmount] = useState('')
//   const [date, setDate] = useState('')

//   // Обработчик изменения суммы — только цифры, формат с пробелами
//   const handleChange = (e) => {
//     const rawValue = e.target.value.replace(/\D/g, '')
//     setRawAmount(rawValue)

//     if (!rawValue) {
//       setDisplayAmount('')
//       return
//     }

//     const formatted = Number(rawValue).toLocaleString('ru-RU')
//     setDisplayAmount(formatted)
//   }

//   // Обновление даты при изменении
//   const handleDateChange = (e) => {
//     setDate(e.target.value)
//   }

//   // Обработчик отправки формы
//   const handleSubmit = (e) => {
//     e.preventDefault() // предотвращаем перезагрузку страницы

//     const form = e.target.closest('form')
//     if (!form) return

//     // Проверяем валидность формы с помощью браузера
//     if (!form.checkValidity()) {
//       // Показываем встроенные подсказки браузера
//       form.reportValidity()
//       return
//     }

//     // Здесь логика отправки данных
//     const amountNumber = Number(rawAmount)
//     console.log('Отправляем на сервер число:', amountNumber)
//     console.log('Дата:', date)
//   }

//   // Обработчик отмены — просто логируем, можно очистить поля
//   const handleCancel = () => {
//     console.log('Отмена формы')
//     // Можно очистить состояние:
//     setRawAmount('')
//     setDisplayAmount('')
//     setDate('')
//   }

//   return (
//     // Оборачиваем в <form>, чтобы использовать встроенную валидацию браузера
//     <form
//       className="bg-white w-[350px] flex flex-col shadow-lg justify-center mx-auto p-4"
//       onSubmit={handleSubmit}
//     >
//       <h1 className="text-center uppercase text-blue-600 font-serif font-bold py-4">
//         Внесение затрат
//       </h1>

//       {/* Блок с выбором даты */}
//       <div className="text-blue-600 text-sm font-serif flex flex-row items-center justify-center mx-auto py-2">
//         <h2 className="uppercase">выбрать дату</h2>
//         <div className="ml-4">
//           <input
//             type="date"
//             value={date}
//             onChange={handleDateChange}
//             required // поле обязательно к заполнению
//             min="2025-01-01" // минимально допустимая дата
//             max="2100-12-31" // максимально допустимая дата
//             className="border rounded px-2 py-1 text-blue-600"
//           />
//         </div>
//       </div>

//       {/* Выбор категории */}
//       <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//         <h2 className="uppercase py-2 text-center">выберите категорию</h2>
//         <select
//           className="w-[250px] py-2 border rounded"
//           defaultValue=""
//           required // обязательно выбрать категорию
//         >
//           <option value="" disabled hidden>
//             Категория...
//           </option>
//           <option value="products">Продукты</option>
//           <option value="travels">Путешествия</option>
//           <option value="games">Игры</option>
//         </select>
//       </div>

//       {/* Поле ввода суммы */}
//       <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//         <label htmlFor="amount" className="uppercase py-2 text-center">
//           Затраты / руб.
//         </label>

//         <input
//           id="amount"
//           type="text"
//           placeholder="0"
//           value={displayAmount}
//           onChange={handleChange}
//           className="w-[165px] py-2 px-3 border rounded text-center text-lg
//                      text-blue-600 border-blue-600 bg-blue-50 font-mono
//                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
//           inputMode="numeric"
//           required // сумма обязательна
//         />
//       </div>

//       {/* Комментарий */}
//       <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//         <label htmlFor="comment" className="uppercase py-2 text-center">
//           Комментарий
//         </label>
//         <textarea
//           id="comment"
//           rows="3"
//           placeholder="Введите комментарий..."
//           className="w-[250px] py-2 px-3 border rounded text-blue-600 border-blue-600 bg-blue-50 font-serif
//                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 resize-none"
//         ></textarea>
//       </div>

//       {/* Кнопки */}
//       <div className="flex justify-end space-x-4 mt-6">
//         <ButtonCancel onClick={handleCancel} />
//         {/* Кнопка отправки — теперь обычная button типа submit */}
//         <button type="submit">
//           <ButtonSend />
//         </button>
//       </div>
//     </form>
//   )
// }

// export default PopupAddCount

// import React, { useState, useRef, useEffect } from 'react'
// import ButtonSend from '../ui/ButtonSend'
// import ButtonCancel from '../ui/ButtonCancel'

// function PopupAddCount({ onClose }) {
//   // Состояния для суммы (raw и отображаемая) и даты
//   const [rawAmount, setRawAmount] = useState('')
//   const [displayAmount, setDisplayAmount] = useState('')
//   const [date, setDate] = useState('')

//   const popupRef = useRef(null)

//   // Закрытие popup при клике вне окна
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (popupRef.current && !popupRef.current.contains(e.target)) {
//         onClose()
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [onClose])

//   // Обработчик закрытия popup
//   const handleClosePopup = () => {
//     onClose()
//   }

//   // Обработчик изменения суммы — только цифры, формат с пробелами
//   const handleChange = (e) => {
//     const rawValue = e.target.value.replace(/\D/g, '')
//     setRawAmount(rawValue)

//     if (!rawValue) {
//       setDisplayAmount('')
//       return
//     }

//     const formatted = Number(rawValue).toLocaleString('ru-RU')
//     setDisplayAmount(formatted)
//   }

//   // Обновление даты при изменении
//   const handleDateChange = (e) => {
//     setDate(e.target.value)
//   }

//   // Обработчик отправки формы
//   const handleSubmit = (e) => {
//     e.preventDefault() // предотвращаем перезагрузку страницы

//     const form = e.target.closest('form')
//     if (!form) return

//     // Проверяем валидность формы с помощью браузера
//     if (!form.checkValidity()) {
//       form.reportValidity()
//       return
//     }

//     // Здесь логика отправки данных
//     const amountNumber = Number(rawAmount)
//     console.log('Отправляем на сервер число:', amountNumber)
//     console.log('Дата:', date)
//   }

//   // Обработчик отмены — просто логируем, можно очистить поля
//   const handleCancel = () => {
//     console.log('Отмена формы')
//     setRawAmount('')
//     setDisplayAmount('')
//     setDate('')
//   }

//   return (
//     // Задний фон + позиционирование popup
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       {/* Сам popup */}
//       <form
//         ref={popupRef}
//         className="relative bg-white w-[350px] flex flex-col shadow-lg justify-center mx-auto p-4 rounded"
//         onSubmit={handleSubmit}
//       >
//         {/* Кнопка закрытия (крестик) */}
//         <button
//           type="button"
//           onClick={handleClosePopup}
//           className="absolute top-2 right-2 text-blue-600 text-xl font-bold hover:text-red-500"
//         >
//           ×
//         </button>

//         <h1 className="text-center uppercase text-blue-600 font-serif font-bold py-4">
//           Внесение затрат
//         </h1>

//         {/* Блок с выбором даты */}
//         <div className="text-blue-600 text-sm font-serif flex flex-row items-center justify-center mx-auto py-2">
//           <h2 className="uppercase">выбрать дату</h2>
//           <div className="ml-4">
//             <input
//               type="date"
//               value={date}
//               onChange={handleDateChange}
//               required
//               min="2025-01-01"
//               max="2100-12-31"
//               className="border rounded px-2 py-1 text-blue-600"
//             />
//           </div>
//         </div>

//         {/* Выбор категории */}
//         <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//           <h2 className="uppercase py-2 text-center">выберите категорию</h2>
//           <select
//             className="w-[250px] py-2 border rounded"
//             defaultValue=""
//             required
//           >
//             <option value="" disabled hidden>
//               Категория...
//             </option>
//             <option value="products">Продукты</option>
//             <option value="travels">Путешествия</option>
//             <option value="games">Игры</option>
//           </select>
//         </div>

//         {/* Поле ввода суммы */}
//         <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//           <label htmlFor="amount" className="uppercase py-2 text-center">
//             Затраты / руб.
//           </label>
//           <input
//             id="amount"
//             type="text"
//             placeholder="0"
//             value={displayAmount}
//             onChange={handleChange}
//             className="w-[165px] py-2 px-3 border rounded text-center text-lg
//                        text-blue-600 border-blue-600 bg-blue-50 font-mono
//                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600"
//             inputMode="numeric"
//             required
//           />
//         </div>

//         {/* Комментарий */}
//         <div className="text-blue-600 text-sm font-serif py-2 flex flex-col items-center w-full">
//           <label htmlFor="comment" className="uppercase py-2 text-center">
//             Комментарий
//           </label>
//           <textarea
//             id="comment"
//             rows="3"
//             placeholder="Введите комментарий..."
//             className="w-[250px] py-2 px-3 border rounded text-blue-600 border-blue-600 bg-blue-50 font-serif
//                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 resize-none"
//           ></textarea>
//         </div>

//         {/* Кнопки */}
//         <div className="flex justify-end space-x-4 mt-6">
//           <ButtonCancel onClick={handleCancel} />
//           <button type="submit">
//             <ButtonSend />
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default PopupAddCount

import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import ButtonSend from '../ui/ButtonSend'
import ButtonCancel from '../ui/ButtonCancel'

function PopupAddCount({ onClose }) {
  const [rawAmount, setRawAmount] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')
  const [date, setDate] = useState('')

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    setRawAmount(rawValue)
    setDisplayAmount(rawValue ? Number(rawValue).toLocaleString('ru-RU') : '')
  }

  const handleDateChange = (e) => setDate(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target.closest('form')
    if (!form) return
    if (!form.checkValidity()) return form.reportValidity()
    console.log('Отправляем:', Number(rawAmount), date)
  }

  const handleCancel = () => {
    console.log('Отмена формы')
    setRawAmount('')
    setDisplayAmount('')
    setDate('')
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
            defaultValue=""
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
