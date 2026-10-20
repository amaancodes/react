import React from 'react'
import { Link, NavLink, Outlet, useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Mock clothing catalog categorized by department
const clothingCatalog = [
  // Men's clothes
  {
    id: 'men-shirt-101',
    name: 'Slim Fit Cotton Shirt',
    category: 'Men',
    price: '$34.99',
    description: '100% breathable cotton formal & casual shirt with spread collar.',
  },
  {
    id: 'men-jeans-102',
    name: 'Classic Straight Denim Jeans',
    category: 'Men',
    price: '$49.99',
    description: 'Durable stretch denim with 5-pocket styling and vintage wash.',
  },
  {
    id: 'men-jacket-103',
    name: 'Casual Lightweight Bomber Jacket',
    category: 'Men',
    price: '$69.99',
    description: 'Water-resistant zip-up jacket perfect for layering in all seasons.',
  },

  // Women's clothes
  {
    id: 'women-dress-201',
    name: 'Floral A-Line Summer Dress',
    category: 'Women',
    price: '$39.99',
    description: 'Breezy chiffon floral print dress with waist tie and flutter sleeves.',
  },
  {
    id: 'women-blouse-202',
    name: 'Satin Silk Evening Blouse',
    category: 'Women',
    price: '$32.99',
    description: 'Elegant v-neck silky top suitable for workwear or evening outings.',
  },
  {
    id: 'women-trousers-203',
    name: 'High-Waisted Wide Leg Trousers',
    category: 'Women',
    price: '$44.99',
    description: 'Tailored pleated trousers designed for comfort and modern style.',
  },

  // Kids' clothes
  {
    id: 'kids-tee-301',
    name: 'Dinosaur Graphic Cotton T-Shirt',
    category: 'Kids',
    price: '$14.99',
    description: 'Soft organic cotton tee with playful glow-in-the-dark print.',
  },
  {
    id: 'kids-dungaree-302',
    name: 'Classic Denim Overalls / Dungarees',
    category: 'Kids',
    price: '$24.99',
    description: 'Adjustable shoulder straps with sturdy pockets for all-day play.',
  },
  {
    id: 'kids-hoodie-303',
    name: 'Cozy Fleece Zip-Up Hoodie',
    category: 'Kids',
    price: '$19.99',
    description: 'Warm, soft fleece hoodie with kangaroo pockets and ribbed cuffs.',
  },
]

// 1. Nested Route Component: Men
export const Men = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'
  const menClothes = clothingCatalog.filter((item) => item.category === 'Men')

  return (
    <div
      className={`p-6 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-amber-500'>Men's Clothing Collection</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Nested Route: <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>/product/men</code> rendered inside <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>&lt;Outlet /&gt;</code>
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {menClothes.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            state={item}
            className={`p-4 rounded-lg border transition hover:scale-[1.02] flex flex-col justify-between ${
              isDark
                ? 'bg-slate-700/60 hover:bg-slate-700 border-slate-600'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div>
              <span className='text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded font-semibold'>
                ID: {item.id}
              </span>
              <h3 className={`text-base font-semibold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
            </div>
            <div className={`mt-4 flex items-center justify-between border-t pt-2 ${isDark ? 'border-slate-600/50' : 'border-slate-200'}`}>
              <span className='text-emerald-500 font-bold text-sm'>{item.price}</span>
              <span className='text-cyan-500 text-xs font-medium'>View Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 2. Nested Route Component: Women
export const Women = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'
  const womenClothes = clothingCatalog.filter((item) => item.category === 'Women')

  return (
    <div
      className={`p-6 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Women's Clothing Collection</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Nested Route: <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>/product/women</code> rendered inside <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>&lt;Outlet /&gt;</code>
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {womenClothes.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            state={item}
            className={`p-4 rounded-lg border transition hover:scale-[1.02] flex flex-col justify-between ${
              isDark
                ? 'bg-slate-700/60 hover:bg-slate-700 border-slate-600'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
                isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-700 bg-emerald-100'
              }`}>
                ID: {item.id}
              </span>
              <h3 className={`text-base font-semibold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
            </div>
            <div className={`mt-4 flex items-center justify-between border-t pt-2 ${isDark ? 'border-slate-600/50' : 'border-slate-200'}`}>
              <span className='text-emerald-500 font-bold text-sm'>{item.price}</span>
              <span className='text-cyan-500 text-xs font-medium'>View Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 3. Nested Route Component: Kids
export const Kids = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'
  const kidsClothes = clothingCatalog.filter((item) => item.category === 'Kids')

  return (
    <div
      className={`p-6 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-green-500'>Kids' Clothing Collection</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Nested Route: <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>/product/kids</code> rendered inside <code className='text-cyan-500 bg-slate-900/10 px-2 py-0.5 rounded'>&lt;Outlet /&gt;</code>
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {kidsClothes.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            state={item}
            className={`p-4 rounded-lg border transition hover:scale-[1.02] flex flex-col justify-between ${
              isDark
                ? 'bg-slate-700/60 hover:bg-slate-700 border-slate-600'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div>
              <span className='text-xs font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded font-semibold'>
                ID: {item.id}
              </span>
              <h3 className={`text-base font-semibold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
            </div>
            <div className={`mt-4 flex items-center justify-between border-t pt-2 ${isDark ? 'border-slate-600/50' : 'border-slate-200'}`}>
              <span className='text-emerald-500 font-bold text-sm'>{item.price}</span>
              <span className='text-cyan-500 text-xs font-medium'>View Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 4. Dynamic Route Component (:productId) demonstrating useParams() hook
export const ProductDetail = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  // Extract route parameter from URL path /product/:productId
  const { productId } = useParams()

  // Optional parameter passing via location state
  const location = useLocation()
  const productInfo = location.state || clothingCatalog.find((p) => p.id === productId)

  return (
    <div
      className={`p-6 rounded-xl border shadow-xl max-w-xl mx-auto text-left transition-colors ${
        isDark ? 'bg-slate-800 border-cyan-500/50' : 'bg-white border-cyan-300'
      }`}
    >
      <div className='flex justify-between items-center mb-3'>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
            isDark ? 'bg-cyan-900 text-cyan-300' : 'bg-cyan-100 text-cyan-800'
          }`}
        >
          Dynamic Route: :productId
        </span>
        <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          useParams(): <strong className='text-amber-500'>{productId}</strong>
        </span>
      </div>

      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {productInfo?.name || `Product: ${productId}`}
      </h2>

      {productInfo ? (
        <div className={`mt-4 space-y-2 border-t pt-4 text-sm ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            <strong>Department:</strong>{' '}
            <span className='text-cyan-500 font-semibold'>{productInfo.category}</span>
          </p>
          <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            <strong>Price:</strong>{' '}
            <span className='text-emerald-500 font-bold text-base'>{productInfo.price}</span>
          </p>
          <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            <strong>Description:</strong>{' '}
            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{productInfo.description}</span>
          </p>
        </div>
      ) : (
        <div className={`mt-4 border-t pt-4 text-sm ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
          <p>
            Custom or direct URL parameter extracted from path:{' '}
            <code className='text-amber-500 font-mono'>{productId}</code>
          </p>
          <p className='text-xs mt-1 text-slate-400'>
            (Item not in static catalog, but parameter was successfully parsed by React Router).
          </p>
        </div>
      )}

      <div className={`mt-6 pt-4 border-t flex justify-between items-center text-xs ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
          Route: <code className='text-amber-500'>/product/{productId}</code>
        </span>
        <div className='flex gap-3'>
          {productInfo && (
            <Link
              to={`/product/${productInfo.category.toLowerCase()}`}
              className='text-cyan-500 hover:underline font-medium'
            >
              ← Back to {productInfo.category}
            </Link>
          )}
          <Link to='/product' className='text-slate-500 hover:underline'>
            All Products
          </Link>
        </div>
      </div>
    </div>
  )
}

// 5. Default view when on /product before selecting a nested tab
export const ProductIndex = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div
      className={`p-6 rounded-lg border border-dashed text-center text-sm transition-colors ${
        isDark
          ? 'bg-slate-800/40 border-slate-700 text-slate-300'
          : 'bg-white border-slate-300 text-slate-600 shadow-sm'
      }`}
    >
      <p className='text-base font-semibold text-cyan-500 mb-2'>
        Choose a clothing department above (Men, Women, Kids)
      </p>
      <p className={`text-xs max-w-lg mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Clicking a tab renders the department's clothes inside the <code className='text-cyan-500 font-mono'>&lt;Outlet /&gt;</code> via <strong>Nested Routes</strong>. Selecting any individual shirt, dress, or hoodie then loads its details via <strong>Dynamic Routing (<code className='text-cyan-500 font-mono'>:productId</code>)</strong>.
      </p>
    </div>
  )
}

// Main Product Layout Component
const Product = () => {
  const theme = useSelector((state) => state.theme.mode)
  const isDark = theme === 'dark'

  return (
    <div className='p-4 md:p-6 max-w-4xl mx-auto'>
      <div className='text-center mb-6'>
        <h1
          className={`text-3xl md:text-4xl font-extrabold mb-2 transition-colors ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          Clothing Store Catalog
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Demonstrating <strong>Nested Routes</strong> with <code className='text-cyan-500 font-mono'>&lt;Outlet /&gt;</code> and <strong>Dynamic Routing</strong> with <code className='text-cyan-500 font-mono'>:productId</code>.
        </p>
      </div>

      {/* Nested Route Tabs: Men, Women, Kids */}
      <div
        className={`p-4 rounded-xl border mb-6 transition-colors ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className={`text-xs font-semibold uppercase tracking-wider mb-3 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Department Tabs (Nested Routes):
        </div>
        <div className='flex justify-center gap-4 flex-wrap'>
          <NavLink
            to='/product/men'
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-medium text-sm transition ${
                isActive
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`
            }
          >
            👔 Men's Clothing
          </NavLink>

          <NavLink
            to='/product/women'
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-medium text-sm transition ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow'
                  : isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`
            }
          >
            👗 Women's Clothing
          </NavLink>

          <NavLink
            to='/product/kids'
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-medium text-sm transition ${
                isActive
                  ? 'bg-green-500 text-black font-semibold shadow'
                  : isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`
            }
          >
            🧒 Kids' Clothing
          </NavLink>
        </div>
      </div>

      {/* Quick Dynamic Route (:productId) links */}
      <div
        className={`p-4 rounded-xl border mb-6 transition-colors ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className={`text-xs font-semibold uppercase tracking-wider mb-3 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Featured Clothing Items (Direct Dynamic Route: /product/:productId):
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          {clothingCatalog.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              state={item}
              className={`p-3 rounded-lg border text-center transition group ${
                isDark
                  ? 'bg-slate-700/60 hover:bg-slate-700 border-slate-600'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className='text-xs text-amber-500 font-mono'>ID: {item.id}</div>
              <div className={`text-sm font-semibold group-hover:text-cyan-500 mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {item.name}
              </div>
              <div className='text-xs text-emerald-500 mt-0.5'>{item.price}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* OUTLET: The placeholder where child routes are rendered */}
      <div className={`mt-8 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className='text-center text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-4'>
          ▼ Outlet Rendering Area ▼
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Product
