import { useState } from 'react';

const FormularioEstado = ({ solicitud, onClose, onSave }) => {
    const [nuevoEstado, setNuevoEstado] = useState(solicitud.estado);

    const handleSave = () => {
        onSave(solicitud.id, nuevoEstado);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Cambiar estado</h2>
                <div className="flex flex-col gap-2 ml-4">
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            value="Existente"
                            checked={nuevoEstado === 'Existente'}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        />
                        <span className="ml-2">Existente</span>
                        <span className='inline-block w-4 h-4 rounded-full bg-green-500'></span>
                    </label>
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            value="En tramite"
                            checked={nuevoEstado === 'En tramite'}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        />
                        <span className="ml-2">En tramite</span>
                        <span className='inline-block w-4 h-4 rounded-full bg-yellow-500'></span>
                    </label>
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            value="Inexistente"
                            checked={nuevoEstado === 'Inexistente'}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        />
                        <span className="ml-2">Inexistente</span>
                        <span className='inline-block w-4 h-4 rounded-full bg-red-500'></span>
                    </label>
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            value="Sin revisar"
                            checked={nuevoEstado === 'Sin revisar'}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        />
                        <span className="ml-2">Sin revisar</span>
                        <span className='inline-block w-4 h-4 rounded-full bg-gray-500'></span>
                    </label>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-rojo text-white rounded-lg">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default FormularioEstado;
