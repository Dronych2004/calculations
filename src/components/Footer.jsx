import { useState } from 'react'
import PrivacyPolicyModal from '../components/ui/PrivacyPolicyModal'
import ContactsModal from '../components/ui/ContactsModal'
import TermsOfUseModal from '../components/ui/TermsOfUseModal'

function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false) // состояние для открытия/закрытия модалки
  const [isContactsOpen, setIsContactsOpen] = useState(false) // состояние для открытия/закрытия модалки контактов
  const [isOpenTermsOfUse, setIsOpenTermsOfUse] = useState(false) // состояние для открытия/закрытия модалки контактов

  return (
    <>
      <footer className="bg-blue-600 text-white h-[120px] flex flex-col items-center justify-center p-6">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} Трекинг затрат и привычек
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsContactsOpen(true)}
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Контакты
            </button>
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setIsOpenTermsOfUse(true)}
              className="relative px-3 py-1 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors"
            >
              Условия использования
            </button>
          </div>
        </div>
      </footer>

      {/* Модалка политики конфеденциальности*/}
      <PrivacyPolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      {/* Модалка контактов*/}
      <ContactsModal
        isOpenContactsModal={isContactsOpen}
        onCloseContactsModal={() => setIsContactsOpen(false)}
      />
      {/* Модалка условия использования*/}
      <TermsOfUseModal
        isOpenTermsOfUseModal={isOpenTermsOfUse}
        onCloseTermsOfUseModal={() => setIsOpenTermsOfUse(false)}
      />
    </>
  )
}

export default Footer
