import { PooIcon, BellIcon, ConfigIcon } from '../assets/svg/SvgIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Sidebar.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
};

function Sidebar({ setIsLoggedIn }) {

    const logout = () => {
        setIsLoggedIn(false)
    }

    return (
        <nav className='fixed left-0 flex flex-col justify-between w-72 border-r-2 z-10 bg-white h-full top-0 py-4'>
            <div className='flex flex-col gap-2 w-full mr-4 mt-24'>
                <h5 className='text-stone-600 text-xl px-8'>Dashboard</h5>
                <Link to={'/'} className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'>
                    <PooIcon size={32} />
                    <p className='text-2xl font-medium'>Solicitudes</p>
                </Link>
                <Link to={'/'} className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'>
                    <PooIcon size={32} />
                    <p className='text-2xl font-medium'>Historial</p>
                </Link>
            </div>
            <div className='flex flex-col gap-2 w-full mr-4'>
                <h5 className='text-stone-600 text-xl px-8'>Cuenta</h5>
                <Link to={'/'} className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'>
                    <BellIcon size={32} />
                    <p className='text-2xl font-medium'>Notificaciones</p>
                </Link>
                <Link to={'/'} className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'>
                    <ConfigIcon size={32} />
                    <p className='text-2xl font-medium'>Configuración</p>
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" className='w-32' />
                <p className='pt-2 font-medium'>Diego Armando Pedrozo Villarreal</p>
                <p className='pb-2 font-medium'>Biblioteca</p>
                <Link to={'/'} onClick={logout} className="duration-300 bg-rojo hover:bg-red-700 text-white font-bold p-2 text-center rounded-lg w-60 self-center">
                    Cerrar Sesión
                </Link>
            </div>
        </nav>
    )
}


export default Sidebar;