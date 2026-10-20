import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Navbar2 from './components/Navbar2'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Home from './pages/home'
import About from './pages/about'
import Product, { Men, Women, Kids, ProductDetail, ProductIndex } from './pages/product'

const App = () => {
  // Read current theme state from Redux store
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. Main Navigation demonstrating NavLink, Link, and Redux Theme Switcher */}
      <Navbar />

      {/* 2. Secondary Navigation demonstrating useNavigate (programmatic navigation) */}
      <Navbar2 />

      {/* 3. Main Route Definitions */}
      <main className='flex-grow p-4 md:p-6'>
        <Routes>
          {/* Top-level Route: Home */}
          <Route path='/' element={<Home />} />

          {/* Top-level Route: About */}
          <Route path='/about' element={<About />} />

          {/* Parent Route for Nested Routes and Dynamic Route */}
          <Route path='/product' element={<Product />}>
            {/* Index Route: Shown when visiting /product directly */}
            <Route index element={<ProductIndex />} />

            {/* Nested Routes: /product/men, /product/women, /product/kids */}
            <Route path='men' element={<Men />} />
            <Route path='women' element={<Women />} />
            <Route path='kids' element={<Kids />} />

            {/* Dynamic Route: /product/:productId (passing parameters to routes) */}
            <Route path=':productId' element={<ProductDetail />} />
          </Route>

          {/* Catch-all Route for 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
