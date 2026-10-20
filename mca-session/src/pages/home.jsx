import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div className='flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto text-center'>
      <h1
        className={`text-3xl md:text-5xl font-extrabold mb-4 transition-colors ${
          isDark ? 'text-cyan-400' : 'text-cyan-700'
        }`}
      >
        React Router & Redux Toolkit Demo
      </h1>
      <p
        className={`text-base md:text-lg max-w-2xl mb-8 leading-relaxed transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        Welcome to the MCA session! This demo covers core routing concepts along with global state management via Redux Toolkit.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full mt-2'>
        <div
          className={`p-5 rounded-xl border shadow transition-colors ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          <h2 className='text-lg font-bold text-amber-500 mb-2'>1. Link & NavLink</h2>
          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Client-side navigation without full page reloads. <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>NavLink</code> provides an <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>isActive</code> prop for styling the active link.
          </p>
        </div>

        <div
          className={`p-5 rounded-xl border shadow transition-colors ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          <h2 className='text-lg font-bold text-amber-500 mb-2'>2. Route & Routes</h2>
          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Map URL paths to React components with <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>&lt;Route path="..." element=&#123;...&#125; /&gt;</code>.
          </p>
        </div>

        <div
          className={`p-5 rounded-xl border shadow transition-colors ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          <h2 className='text-lg font-bold text-amber-500 mb-2'>3. Nested Routes & Outlet</h2>
          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Render sub-pages inside parent layouts using child <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>&lt;Route&gt;</code> and <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>&lt;Outlet /&gt;</code>.
          </p>
        </div>

        <div
          className={`p-5 rounded-xl border shadow transition-colors ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          <h2 className='text-lg font-bold text-amber-500 mb-2'>4. Dynamic Routing (:productId)</h2>
          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Pass route parameters using <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>:productId</code> and extract them using the <code className='text-cyan-500 bg-slate-900/10 px-1 py-0.5 rounded'>useParams()</code> hook.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
