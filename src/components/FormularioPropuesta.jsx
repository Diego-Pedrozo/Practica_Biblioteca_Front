import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import config from '../../config';

const FormularioPropuesta = ({ onClose }) => {
    const [titulo, setTitulo] = useState('')
    const [url, setUrl] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        const data = {
            'titulo': titulo,
            'url': url
        };

        try {
            const response = await axios.post(`${config.backendUrl}/api/materialbibliografico/propuestas_excel/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose();
            toast.success(response.data.mensaje)
        } catch (error) {
            toast.error(error.response.data.mensaje)
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
                        <label className="block text-gray-700 mb-2">Url excel</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
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

FormularioPropuesta.propTypes = {
    onClose: PropTypes.func,
};

export default FormularioPropuesta;