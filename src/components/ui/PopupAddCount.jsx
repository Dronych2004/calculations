import React from 'react'

function PopupAddCount() {
  return (
    <div className="bg-white w-[350px] flex flex-col shadow-lg justify-center mx-auto">
      <h1 className="text-center uppercase text-blue-600 font-serif font-bold py-4">
        Внесение затрат
      </h1>
      <div className="text-blue-600 text-sm font-serif flex flex-row mx-auto py-2">
        <h2 className="uppercase">календарь</h2>
        <div className="ml-4">дата</div>
      </div>

      <div className="text-blue-600 text-sm font-serif py-2">
        <h2 className="uppercase py-2">выбирете категорию</h2>
        <select className="w-[250px] py-2 border rounded">
          <option value="" disabled selected hidden>
            Категория...
          </option>
          <option value="products">Продукты</option>
          <option value="travels">Путешествия</option>
          <option value="games">Игры</option>
        </select>
      </div>
    </div>
  )
}

export default PopupAddCount
