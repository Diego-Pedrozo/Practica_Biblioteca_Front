import PropTypes from 'prop-types';

function Publicacion({ id, titulo, descripcion, imagen, onDelete, state }) {
    const isDashboard = location.pathname === '/dashboard';
    return (
        <div className='container mx-auto my-5 border rounded flex flex-col sm:flex-row'>
            <img src={imagen} alt="imagen" className='w-auto h-80 object-cover m-5 sm:w-full sm:h-80' />
            <div className='m-5 flex flex-col gap-6 w-fit h-80'>
                <h2 className='bg-gray-200 h-20 overflow-auto text-xl font-bold text-justify p-1'>{titulo}</h2>
                <p className='bg-gray-200 h-60 overflow-auto text-justify p-1'>{descripcion}</p>
                {state.isLoggedIn && isDashboard && (
                    <div className='flex justify-end gap-5'>
                        <button onClick={() => onDelete(id)} className="bg-rojo text-white py-1 px-3 rounded w-fit duration-300 hover:scale-105">Papelera</button>
                        {/* <button className="bg-blue-500 text-white py-1 px-3 rounded w-fit duration-300 hover:scale-105">Editar</button> */}
                    </div>
                )}
            </div>
        </div>
    )
}

Publicacion.propTypes = {
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    state: PropTypes.object,
};

export default Publicacion