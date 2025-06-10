import { Outlet } from 'react-router-dom'
import Header from './../components/Header'
import Footer from './../components/Footer'

const MainLayout = () => {
  return (
    // 1) flex-контейнер по колонке, занимающий 100vh
    <div className="flex flex-col min-h-screen">
      {/* 2) Header зафиксирован сверху */}
      <Header />

      {/* 3) Центральная область растягивается */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 4) Footer прижат к низу */}
      <Footer />
    </div>
  )
}

export default MainLayout
