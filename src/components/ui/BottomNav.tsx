'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  icon: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', icon: 'calendar_month', label: 'Plan' },
  { href: '/dashboard/recetas', icon: 'menu_book', label: 'Recetas' },
  { href: '/dashboard/progreso', icon: 'bar_chart', label: 'Progreso' },
  { href: '/dashboard/perfil', icon: 'person', label: 'Perfil' },
]

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-cream-surface dark:border-dark-border pb-safe pt-2"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex justify-between items-end pb-4 px-6 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 group"
              aria-current={active ? 'page' : undefined}
            >
              <div className="p-1 rounded-full group-hover:bg-cream-surface dark:group-hover:bg-dark-surface transition-colors">
                <span
                  className={`material-symbols-outlined text-[24px] transition-colors duration-150 ${
                    active
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-150 ${
                  active
                    ? 'font-bold text-gray-900 dark:text-gray-100'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
