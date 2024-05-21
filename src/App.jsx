// import Dashboard from './Dashboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'

function App() {
  return (
    <>
      <div className='flex flex-col w-full'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
