import { useState } from 'react'
import PrivacyPolicyModal from '../components/ui/PrivacyPolicyModal'

function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false) // состояние для открытия/закрытия модалки

  return (
    <>
      <footer className="bg-blue-600 text-white h-[120px] flex flex-col items-center justify-center p-6">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} Трекинг затрат и привычек
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Контакты
            </a>
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Политика конфиденциальности
            </button>
            <a
              href="#"
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Условия использования
            </a>
          </div>
        </div>
      </footer>

      {/* Модалка */}
      <PrivacyPolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </>
  )
}

export default Footer
