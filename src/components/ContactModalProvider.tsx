import { createContext, useContext, useState, useCallback } from 'react'
import type { FormType } from '@/features/leads/types'

interface ModalOptions {
  service?: string
  sourceCta?: string
  formType?: FormType
}

interface ContactModalContextType {
  // Lead form modal
  isOpen: boolean
  options: ModalOptions
  openLeadForm: (opts?: ModalOptions) => void
  closeLeadForm: () => void

  // Options modal
  isOptionsOpen: boolean
  optionsModalOpts: ModalOptions
  openContactOptions: (opts?: ModalOptions) => void
  closeContactOptions: () => void
}

const ContactModalContext = createContext<ContactModalContextType | null>(null)

export function useContactModal(): ContactModalContextType {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    throw new Error('useContactModal must be used inside ContactModalProvider')
  }
  return ctx
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  // Lead form modal state
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ModalOptions>({})

  // Options modal state
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [optionsModalOpts, setOptionsModalOpts] = useState<ModalOptions>({})

  const openLeadForm = useCallback((opts?: ModalOptions) => {
    setOptions(opts ?? {})
    setIsOpen(true)
  }, [])

  const closeLeadForm = useCallback(() => {
    setIsOpen(false)
    setOptions({})
  }, [])

  const openContactOptions = useCallback((opts?: ModalOptions) => {
    setOptionsModalOpts(opts ?? {})
    setIsOptionsOpen(true)
  }, [])

  const closeContactOptions = useCallback(() => {
    setIsOptionsOpen(false)
    setOptionsModalOpts({})
  }, [])

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        options,
        openLeadForm,
        closeLeadForm,
        isOptionsOpen,
        optionsModalOpts,
        openContactOptions,
        closeContactOptions,
      }}
    >
      {children}
    </ContactModalContext.Provider>
  )
}
