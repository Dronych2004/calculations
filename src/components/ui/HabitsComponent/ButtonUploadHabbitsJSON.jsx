import React from 'react'

function ButtonUploadHabbitsJSON({ onUpload }) {
  const handleUploadHabbits = (e) => {
    const file = e.target.files[0] //  получение загруженного файла из инпута
    // e — это событие onChange, которое срабатывает, когда пользователь выбирает файл.
    // e.target — это сам элемент <input type="file">.
    // e.target.files — это FileList, список выбранных файлов.
    // [0] — означает взять первый файл из списка (в данном случае только один, потому что не указан multiple).
    if (!file) return

    const reader = new FileReader() //FileReader позволяет читать содержимое файлов на стороне клиента (в браузере), без загрузки на сервер.

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result)
        if (Array.isArray(json)) {
          onUpload(json) //передаём данные вверх в компонент Counts
        } else {
          alert('Файл не содержит корректный массив данных.')
        }
      } catch (error) {
        alert('Ошибка при чтении JSON файла.')
        console.error(error)
      }
    }

    reader.readAsText(file) //читаем файл как текст.
  }

  return (
    <label className="bg-green-500 text-white rounded px-3 py-1 mx-2 hover:bg-green-700 transition">
      Загрузить JSON
      <input type="file" accept=".json" hidden onChange={handleUploadHabbits} />
    </label>
  )
}

export default ButtonUploadHabbitsJSON
