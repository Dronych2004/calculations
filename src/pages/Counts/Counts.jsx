import React from 'react'
import { useState } from 'react'
import ButtonAddCount from '../../components/ui/ButtonAddCount'
import PopupAddCount from '../../components/ui/PopupAddCount'

function Counts() {
  const [counts, setCounts] = useState([])

  return (
    <div className="bg-[whitesmoke] text-blue-500">
      <h1 className="py-2 mx-auto w-max uppercase font-bold font-serif">
        Затраты
      </h1>
      <ButtonAddCount />
      <PopupAddCount />
    </div>
  )
}

export default Counts
