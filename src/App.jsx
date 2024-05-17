// import Dashboard from './Dashboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'
import Solicitudes from './Solicitudes'

function App() {
  return (
    <>
      <div className='flex flex-col w-full'>
        <Navbar />
        <Publicaciones />
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboardd' element={<Dashboard />} />
          <Route path='/solicitudes' element={<Solicitudes />} />
        </Routes>
      </div>
    </>
  )
}

export default App
