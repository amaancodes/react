import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'

const Navbar = () => {
  // Redux Toolkit state & dispatch
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()

  const isDark = theme === 'dark'

  return (
    <nav
      className={`flex py-4 items-center px-6 md:px-8 justify-between shadow-md transition-colors duration-200 ${
        isDark ? 'bg-cyan-950 text-white border-b border-cyan-850' : 'bg-cyan-600 text-white border-b border-cyan-700'
      }`}
    >
      {/* Brand logo demonstrating standard Link */}
      <Link
        to='/'
        className='text-2xl font-bold tracking-wide hover:text-cyan-200 transition-colors'
      >
        MCA Router
      </Link>

      {/* Navigation links demonstrating NavLink (with active link highlighting) */}
      <div className='flex gap-4 md:gap-6 items-center'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-base md:text-lg font-medium px-3 py-1 rounded transition-colors ${
              isActive
                ? isDark
                  ? 'bg-cyan-800 text-amber-300 font-semibold'
                  : 'bg-cyan-700 text-amber-200 font-semibold'
                : 'hover:text-amber-200'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) =>
            `text-base md:text-lg font-medium px-3 py-1 rounded transition-colors ${
              isActive
                ? isDark
                  ? 'bg-cyan-800 text-amber-300 font-semibold'
                  : 'bg-cyan-700 text-amber-200 font-semibold'
                : 'hover:text-amber-200'
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to='/product'
          className={({ isActive }) =>
            `text-base md:text-lg font-medium px-3 py-1 rounded transition-colors ${
              isActive
                ? isDark
                  ? 'bg-cyan-800 text-amber-300 font-semibold'
                  : 'bg-cyan-700 text-amber-200 font-semibold'
                : 'hover:text-amber-200'
            }`
          }
        >
          Product
        </NavLink>

        {/* Redux Toolkit Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition active:scale-95 cursor-pointer border ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
              : 'bg-cyan-700 hover:bg-cyan-800 text-amber-100 border-cyan-500'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          aria-label='Toggle theme'
        >
          <span>{isDark ? '☀️' : '🌙'}</span>
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
