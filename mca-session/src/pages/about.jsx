import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const About = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div className='flex flex-col items-center justify-center p-4 md:p-8 max-w-3xl mx-auto text-center'>
      <h1
        className={`text-3xl md:text-4xl font-extrabold mb-4 transition-colors ${
          isDark ? 'text-cyan-400' : 'text-cyan-700'
        }`}
      >
        About Page
      </h1>
      <p
        className={`text-base md:text-lg leading-relaxed mb-6 transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        React Router is the standard library for client-side routing in React. Combined with Redux Toolkit, it gives applications both seamless navigation and predictable global state management.
      </p>

      <div
        className={`p-6 rounded-xl border text-left w-full shadow transition-colors ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-300'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        <h2 className='text-lg font-semibold text-amber-500 mb-3'>Key Concepts for Students:</h2>
        <ul className='space-y-2 list-disc list-inside text-sm'>
          <li><strong>No Page Reload:</strong> Navigation happens instantaneously on the client.</li>
          <li><strong>URL Sync:</strong> The browser URL reflects the currently active view and supports bookmarking/sharing.</li>
          <li><strong>Global Theme State:</strong> Redux Toolkit manages theme state globally across all pages and components.</li>
        </ul>
      </div>

      <div className='mt-8'>
        <Link
          to='/product'
          className='inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2.5 rounded-lg transition shadow'
        >
          Explore Clothing Catalog (Nested & Dynamic Routes) →
        </Link>
      </div>
    </div>
  )
}

export default About
