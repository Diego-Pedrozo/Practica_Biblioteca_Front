import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import config from '../../config';

const FormularioNotificacion = ({ solicitudes, onClose }) => {
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        try {
            if (archivo) {
                formData.append('archivo', archivo);
            }
            formData.append('ids_solicitudes', JSON.stringify(solicitudes));
            const response = await axios.post(`${config.backendUrl}/api/materialbibliografico/notificacion/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose();
            toast.success('Notificación enviada')
        } catch (error) {
            toast.error('Error al enviar la notificación, seleccionelas y vuelva a intentar')
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-xl font-semibold mb-4">Proceso de adquisición</h2>
                <form onSubmit={handleSubmit}>
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
                        <label className="block text-gray-700 mb-2">Archivo adjunto (opcional)</label>
                        <input
                            type="file"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => setArchivo(e.target.files[0])}
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

FormularioNotificacion.propTypes = {
    solicitudes: PropTypes.array.isRequired,
    onClose: PropTypes.func,
};


export default FormularioNotificacion;
