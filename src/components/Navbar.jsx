import logo from '../assets/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FormularioLogin from './FormularioLogin';
import { useSession } from '../hooks/SessionContext';

function Navbar() {
    const { state } = useSession();
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <>
            <nav className='bg-rojo px-8 py-4 flex justify-between items-center z-50 h-24'>
                <Link to={'/'} className='hover:scale-105 duration-300'>
                    <img src={logo} alt="Logo" className="w-40" />
                </Link>
                <h1 className="text-white font-semibold text-2xl">Adquisición de material bibliográfico</h1>
                {
                    !state.isLoggedIn && !isDashboard ? (
                        <button
                            className="duration-300 bg-white text-rojo hover:scale-105 font-bold p-2 text-center rounded-lg w-40 self-center"
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            {isFormVisible ? 'Cancelar' : 'Iniciar Sesión'}
                        </button>
                    ) : (
                        !isDashboard && state.isLoggedIn ? (
                            <Link to={'/dashboard'} className="duration-300 bg-white text-rojo hover:scale-105 font-bold p-2 text-center rounded-lg w-40 self-center">
                                Dashboard
                            </Link>
                        ) : (
                            isDashboard && state.isLoggedIn && (
                                <div className='w-40'></div>
                            )
                        )
                    )
                }
                {
                    isFormVisible && (
                        <FormularioLogin closeForm={() => setIsFormVisible(false)} />
                    )
                }
            </nav>
        </>
    )
}

export default Navbar