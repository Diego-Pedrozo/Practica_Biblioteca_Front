import { PooIcon, BellIcon, ConfigIcon } from '../assets/svg/SvgIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSession } from '../hooks/SessionContext';

function Sidebar({ onOptionChange, userData }) {

    const { dispatch } = useSession();

    const logout = async () => {
        localStorage.removeItem('authToken');
        dispatch({
            type: 'LOGOUT',
        });
    }

    const roles = {
        1: 'Administrador',
        2: 'Director plan de estudios',
        3: 'Director de departamento',
        4: 'Decano',
        5: 'Biblioteca',
        6: 'Vicerrector',
    };
    const userRole = roles[userData.information.user_type];


    const facultades = {
        1: 'Ciencias Agrarias y del Ambiente',
        2: 'Ciencias Básicas',
        3: 'Ciencias Empresariales',
        4: 'Ciencias de salud',
        5: 'Educación, Artes y Humanidades',
        6: 'Ingeniería',
    }
    const facultad = facultades[userData.information.user_facultad];

    const programas = {
        1: 'Ingeniería Agroindustrial',
        2: 'Ingeniería Agronómica',
        3: 'Ingeniería Ambiental',
        4: 'Ingeniería Biotecnológica',
        5: 'Zootecnia',
        6: 'Química Industrial',
        7: 'Administración de Empresas',
        8: 'Contaduría Pública',
        9: 'Comercio Internacional',
        10: 'Enfermería',
        11: 'Seguridad y Salud en el Trabajo',
        12: 'Comunicación Social',
        13: 'Trabajo Social',
        14: 'Derecho',
        15: 'Arquitectura',
        16: 'Ingeniería Civil',
        17: 'Ingeniería de Sistemas',
        18: 'Ingeniería Electrónica',
        19: 'Ingeniería Electromecánica',
        20: 'Ingeniería Industrial',
        21: 'Ingeniería de Minas',
        22: 'Ingeniería Mecánica',
    };

    const programa = programas[userData.information.user_programa];

    return (
        <nav className='fixed left-0 flex flex-col justify-between w-72 border-r-2 z-10 bg-white h-full top-0 py-4'>
            <div className='flex flex-col gap-2 w-full mr-4 mt-24'>
                <h5 className='text-stone-600 text-xl px-8'>Dashboard</h5>
                <button onClick={() => onOptionChange('solicitudes')} className="className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'">
                    <PooIcon size={32} />
                    <p className='text-2xl font-medium'>Solicitudes</p>
                </button>
                {userData.information.user_type === '5' && (
                    <button onClick={() => onOptionChange('vicerrectoria')} className="className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                    flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'">
                        <PooIcon size={32} />
                        <p className='text-2xl font-medium'>Publicaciones</p>
                    </button>
                )}
            </div>
            <div className='flex flex-col gap-2 w-full mr-4'>
                <h5 className='text-stone-600 text-xl px-8'>Cuenta</h5>
                <button onClick={() => onOptionChange('notificaciones')} className="className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'">
                    <BellIcon size={32} />
                    <p className='text-2xl font-medium'>Notificaciones</p>
                </button>
                <Link to={'/'} className='duration-300 fill-rojo stroke-rojo hover:stroke-white hover:fill-white hover:bg-rojo hover:text-white
                flex gap-4 justify-start items-center rounded-r-full p-4 mr-4'>
                    <ConfigIcon size={32} />
                    <p className='text-2xl font-medium'>Configuración</p>
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" className='w-1/3' />
                <p className='pt-2 font-medium'>{userData.first_name + ' ' + userData.last_name}</p>
                <p className='pb-2 font-medium'>{userRole}</p>
                <p className='pt-2 text-xs justify-end'>{facultad}</p>
                <p className='pb-2 text-xs'>{programa}</p>
                <Link to={'/'} onClick={logout} className="duration-300 bg-rojo hover:bg-red-700 text-white font-bold p-2 text-center rounded-lg w-60 self-center">
                    Cerrar Sesión
                </Link>
            </div>
        </nav>
    )
}

Sidebar.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

export default Sidebar;