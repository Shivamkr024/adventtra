import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'

// Lazy-load the page to keep initial bundle size small.
const HomePage = lazy(() => import('./pages/HomePage'))

function App() {
  return (
    // App shell: global background/text theme + persistent UI elements.
    <div className="relative min-h-screen bg-[#070b14] text-slate-100">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
      <ScrollToTop />
    </div>
  )
}

export default App
