import logo from '../assets/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import Sidebar from './Sidebar';

function Navbar() {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    return (
        <>
            <nav className='bg-rojo px-8 py-4 flex justify-between items-center z-50 h-24'>
                <Link to={'/'} className='hover:scale-105 duration-300'>
                    <img src={logo} alt="Logo" className="w-40" />
                </Link>
                <h1 className="text-white font-semibold text-2xl">Adquisición de material bibliográfico</h1>
                {
                    !isLoggedIn && (
                        <Link to={'/dashboard'} onClick={login} className="duration-300 bg-white text-rojo hover:scale-105 font-bold p-2 text-center rounded-lg w-40 self-center">
                            Iniciar Sesión
                        </Link>
                    )

                }
                {
                    !isDashboard && isLoggedIn && (
                        <Link to={'/dashboard'} onClick={login} className="duration-300 bg-white text-rojo hover:scale-105 font-bold p-2 text-center rounded-lg w-40 self-center">
                            Dashboard
                        </Link>
                    )
                }
                {
                    isDashboard && isLoggedIn && (
                        <div className='w-40'></div>
                    )
                }
            </nav>
            {/* {
                isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} />
            } */}
        </>
    )
}

export default Navbar