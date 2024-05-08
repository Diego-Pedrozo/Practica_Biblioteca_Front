import Dashboard from './Dashboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/views/Home'

function App() {
  return (
    <>
      <div className='flex flex-col w-full'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        {/* <div className='flex-1 bg-slate-200'>
          <h1 className="text-5xl font-bold underline m-10">
            Publicaciones
          </h1>
        </div> */}
      </div>
    </>
  )
}

export default App
