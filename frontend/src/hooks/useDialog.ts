import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Accessibility plumbing shared by modals and drawers:
 * - moves focus into the dialog when it opens,
 * - traps Tab inside it (wraps last → first),
 * - closes on Escape,
 * - restores focus to the previously focused element when it closes.
 *
 * Returns a ref to attach to the dialog container.
 */
export function useDialog<T extends HTMLElement>({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const containerRef = useRef<T>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const container = containerRef.current
    const focusables = container?.querySelectorAll<HTMLElement>(FOCUSABLE)
    focusables?.[0]?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !container) return

      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  return containerRef
}
