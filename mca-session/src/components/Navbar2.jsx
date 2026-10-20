import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar2 = () => {
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div
      className={`py-2 px-6 md:px-8 flex flex-wrap gap-2 items-center border-b transition-colors duration-200 ${
        isDark
          ? 'bg-cyan-950 border-cyan-800'
          : 'bg-cyan-50 border-cyan-200 text-cyan-900'
      }`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wider mr-2 ${
          isDark ? 'text-cyan-400' : 'text-cyan-800'
        }`}
      >
        Programmatic Nav (useNavigate):
      </span>
      <button
        onClick={() => navigate('/')}
        className='font-medium text-xs md:text-sm bg-amber-500 hover:bg-amber-600 text-black px-3.5 py-1.5 rounded cursor-pointer active:scale-95 transition'
      >
        Return to Home Page
      </button>
      <button
        onClick={() => navigate(-1)}
        className='font-medium text-xs md:text-sm bg-amber-500 hover:bg-amber-600 text-black px-3.5 py-1.5 rounded cursor-pointer active:scale-95 transition'
      >
        ← Back
      </button>
      <button
        onClick={() => navigate(1)}
        className='font-medium text-xs md:text-sm bg-amber-500 hover:bg-amber-600 text-black px-3.5 py-1.5 rounded cursor-pointer active:scale-95 transition'
      >
        Next →
      </button>
    </div>
  )
}

export default Navbar2
