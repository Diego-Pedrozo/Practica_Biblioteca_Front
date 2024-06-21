import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';

const FormularioFechasLimite = ({ onClose, onSave }) => {
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();

    const handleSave = () => {
        onSave(fechaInicio, fechaFin);
        onClose();
    };

    const fetchFechasLimite = async (token) => {
        const response = await axios.get(`${config.backendUrl}/api/materialbibliografico/fechas_limite/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const fechasLimite = await fetchFechasLimite(token)
                setFechaInicio(fechasLimite.fecha_inicio)
                setFechaFin(fechasLimite.fecha_fin)
            } catch (error) {
                onClose()
            }
        }
        fetchData();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Establecer fechas límite</h2>
                <div className="flex flex-col gap-2 ml-4">
                    <div className='flex flex-col justify-between'>
                        <label className="block text-rojo font-semibold pr-5">
                            Fecha inicio:
                            <input
                                type="date"
                                className="ml-2 p-2 border rounded"
                                id="fechaInicio"
                                name="fechaInicio"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </label>
                        <label className="block text-rojo font-semibold">
                            Fecha fin:
                            <input
                                type="date"
                                className="ml-2 p-2 border rounded"
                                id="fechaFin"
                                name="fechaFin"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-rojo text-white rounded-lg">Guardar</button>
                </div>
            </div>
        </div>
    );
};

FormularioFechasLimite.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default FormularioFechasLimite;
