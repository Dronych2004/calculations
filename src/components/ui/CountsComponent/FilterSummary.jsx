function FilterSummary({ filteredCountsSumm }) {
  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white text-blue-600 px-4 py-2 rounded shadow-sm">
        <h1 className="text-xl font-bold font-mono tabular-nums">
          Итого:{' '}
          {filteredCountsSumm
            .toLocaleString('ru-RU')
            .replace(/\u00A0/g, '\u2009')}{' '}
          ₽
        </h1>
      </div>
    </div>
  )
}

export default FilterSummary
