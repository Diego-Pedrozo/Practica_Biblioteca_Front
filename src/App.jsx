// import Dashboard from './Dashboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSession } from './hooks/SessionContext'

function App() {

  const { dispatch } = useSession();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        // Solicitar datos del usuario
        const response = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response && dispatch({
          type: 'LOGIN',
        });
      } catch (error) {
        // Manejar errores
        dispatch({
          type: 'LOGOUT',
        });
        console.error('Error al obtener los datos:', error);
        navigate('/')
      }
    };

    fetchData();
  }, []);

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
