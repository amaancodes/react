import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <footer
      className={`w-full border-t flex items-center justify-center py-4 text-xs mt-auto transition-colors duration-200 ${
        isDark
          ? 'bg-cyan-950 border-cyan-800 text-cyan-300'
          : 'bg-slate-200 border-slate-300 text-slate-700'
      }`}
    >
      <p>© MCA React Router & Redux Toolkit Session Demo • Built with React</p>
    </footer>
  )
}

export default Footer
