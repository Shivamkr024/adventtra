import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { navItems } from '../utils/data'
import useScrollSpy from '../hooks/useScrollSpy'

function Navbar() {
  // Mobile menu toggle state.
  const [open, setOpen] = useState(false)
  // Switches navbar styling after page scroll.
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = navItems.map((item) => item.href.replace('#', ''))
  // Highlights the link for the section currently visible in viewport.
  const active = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0b0d12]/90 py-2 backdrop-blur-xl' : 'bg-transparent py-3'
      }`}
    >
      <nav className="mx-auto flex w-[min(1120px,92%)] items-center justify-between">
        {/* <a href="#hero" className="font-title text-3xl tracking-wide text-white md:text-4xl">
        Adventtra
        </a> */}

        {/* Desktop links */}
        {/* <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-title text-2xl transition ${
                  isActive ? 'text-violet-300' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div> */}

        {/* <button className="text-white md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button> */}
      </nav>

      {/* Mobile dropdown links
      {open && (
        <div className="mx-auto mt-3 w-[min(1120px,92%)] rounded border border-white/10 bg-[#0f1118]/95 p-4 shadow-card md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-title rounded px-3 py-2 text-2xl text-slate-100 transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )} */}
    </header>
  )
}

export default Navbar
