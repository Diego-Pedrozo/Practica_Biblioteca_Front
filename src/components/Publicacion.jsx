//import React from 'react'
import PropTypes from 'prop-types';

Publicacion.propTypes = {
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired
};

function Publicacion({ titulo, descripcion, imagen }) {
    return (
        <div className='container mx-auto mt-10 mb-10 border rounded flex flex-col sm:flex-row'>
            <img src={imagen} alt="imagen" className='w-auto h-80 object-cover m-5 sm:w-full sm:h-80' />
            <div className='m-5 flex flex-col gap-6 w-fit h-80'>
                <h2 className='bg-gray-200 h-20 overflow-auto text-xl font-bold text-justify'>{titulo}</h2>
                <p className='bg-gray-200 h-60 overflow-auto text-justify'>{descripcion}</p>
            </div>
        </div>
    )
}

export default Publicacion