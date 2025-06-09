import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Counts from './pages/Counts/Counts'
import Habits from './pages/Habits/Habits'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Counts />} />
          <Route path="habits" element={<Habits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
