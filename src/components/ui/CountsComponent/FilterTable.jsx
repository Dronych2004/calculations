import Pagination from '../Pagination'

function FilterTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) {
  return (
    <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-blue-200 rounded shadow-sm">
        <thead>
          <tr className="bg-blue-100 text-blue-600 text-left text-sm font-bold font-serif">
            <th className="px-4 py-2 border-r">№</th>
            <th className="px-4 py-2 border-r">Дата</th>
            <th className="px-4 py-2 border-r">Категория</th>
            <th className="px-4 py-2 border-r">Сумма</th>
            <th className="px-4 py-2 border-r">Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="text-blue-600 text-sm font-serif border-t hover:bg-blue-50"
            >
              <td className="px-4 py-2 border-r text-center">{index + 1}</td>
              <td className="px-4 py-2 border-r">{item.date}</td>
              <td className="px-4 py-2 border-r">{item.category}</td>
              <td className="px-4 py-2 border-r text-right">
                {item.money.toLocaleString('ru-RU')} ₽
              </td>
              <td className="px-4 py-2 border-r">
                {item.comment?.trim() || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default FilterTable
