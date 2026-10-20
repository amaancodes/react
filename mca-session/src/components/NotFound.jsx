import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotFound = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div className='flex flex-col items-center justify-center p-12 text-center'>
      <h1 className='text-6xl font-black text-rose-500 mb-4'>404</h1>
      <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Page Not Found
      </h2>
      <p className={`mb-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        The requested URL was not found on this router. Demonstrated using the catch-all{' '}
        <code className='text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded'>path='*'</code> route.
      </p>
      <Link
        to='/'
        className='bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-lg transition text-sm'
      >
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound
