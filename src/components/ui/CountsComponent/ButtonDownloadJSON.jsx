import React from 'react'

function ButtonDownloadJSON({ data }) {
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      // Blob([...], { type: 'application/json' }) — создаёт «файл» в памяти. Превращает объект в текст в формате JSON с красивой табуляцией с отступом в 2 пробела
      type: 'application/json', //указывает тип
    })
    const url = URL.createObjectURL(blob) //создает временну ссылку для скачивания

    const a = document.createElement('a') //инициирует скачивание файла пользователю
    a.href = url
    a.download = 'counts.json'
    a.click() //инициирует скачивание файла пользователю

    URL.revokeObjectURL(url) //очищает память после скачивания.
  }

  return (
    <button
      onClick={handleDownloadJSON}
      className="bg-blue-500 text-white rounded px-3 py-1 mx-2 hover:bg-blue-700 transition"
    >
      Скачать JSON
    </button>
  )
}

export default ButtonDownloadJSON
