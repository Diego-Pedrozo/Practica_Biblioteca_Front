import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const FormularioPublicacion = ({ onClose }) => {
    const [imagen, setImagen] = useState(null);
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        if (imagen) {
            formData.append('imagen', imagen);
        }
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/materialbibliografico/publicacion/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose();
            toast.success(response.data.mensaje)
        } catch (error) {
            toast.error('Error al crear la publicación')
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-xl font-semibold mb-4">Crear Publicación</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Titulo</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Descripción</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Imagen</label>
                        <input
                            type="file"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => setImagen(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-rojo text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

FormularioPublicacion.propTypes = {
    onClose: PropTypes.func,
};

export default FormularioPublicacion;