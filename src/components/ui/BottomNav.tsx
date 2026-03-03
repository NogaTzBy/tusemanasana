'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  icon: string
  label: string
}

const NAV_ITEMS_LEFT: NavItem[] = [
  { href: '/dashboard', icon: 'home', label: 'Inicio' },
  { href: '/dashboard/plan', icon: 'calendar_today', label: 'Mi Plan' },
]

const NAV_ITEMS_RIGHT: NavItem[] = [
  { href: '/dashboard/lista', icon: 'shopping_cart', label: 'Lista' },
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-t border-gray-200/60 dark:border-dark-border"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {/* Lado izquierdo */}
        {NAV_ITEMS_LEFT.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}

        {/* Botón central destacado */}
        <Link
          href="/dashboard/lista"
          className="flex flex-col items-center justify-center -mt-5"
          aria-label="Lista de compras"
        >
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-terracotta shadow-lg shadow-terracotta/30 hover:bg-terracotta-dark active:scale-95 transition-all duration-150">
            <span className="material-symbols-outlined text-white text-[26px]">
              restaurant
            </span>
          </span>
        </Link>

        {/* Lado derecho */}
        {NAV_ITEMS_RIGHT.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </div>

      {/* Safe area para dispositivos con home bar */}
      <div className="h-safe-bottom bg-white/95 dark:bg-dark-surface/95" />
    </nav>
  )
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-w-[56px]"
      aria-current={active ? 'page' : undefined}
    >
      <span
        className={`material-symbols-outlined text-[24px] transition-colors duration-150 ${
          active
            ? 'text-terracotta'
            : 'text-gray-400 dark:text-gray-500'
        }`}
        style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
      >
        {item.icon}
      </span>
      <span
        className={`text-[10px] font-medium transition-colors duration-150 ${
          active
            ? 'text-terracotta'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        {item.label}
      </span>
    </Link>
  )
}
