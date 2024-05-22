//import React from 'react';
import PropTypes from 'prop-types';
import data from '../utils/programas.json';
import { useEffect, useState } from "react";

const Table = ({ solicitudes, userData, selectedOption }) => {
    const user_type = userData.information.user_type;
    const user_facultad = userData.information.user_facultad || '';
    const user_programa = userData.information.user_programa || '';
    const showRechazarButton = user_type !== '2' && user_type !== '3' && user_type !== '4' && user_type !== '5';

    const [selectedAll, setSelectedAll] = useState(false);
    const [selected, setSelected] = useState(solicitudes.map(() => false));
    const [facultad, setFacultad] = useState('');
    const [programa, setPrograma] = useState('');
    const [filter, setFilter] = useState({
        facultad: '',
        programa: '',
        estado: '',
        fechaInicio: '',
        fechaFin: '',
    });

    useEffect(() => {
        if (user_facultad) {
            setFacultad(user_facultad.toString());
            setFilter((prevFilter) => ({
                ...prevFilter,
                facultad: user_facultad.toString(),
            }));
            if (user_programa) {
                setPrograma(user_programa.toString());
                setFilter((prevFilter) => ({
                    ...prevFilter,
                    programa: user_programa.toString(),
                }));
            }
        }
    }, [user_facultad, user_programa]);

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll);
        setSelected(solicitudes.map(() => !selectedAll));
    };

    const handleSelect = (index) => {
        const newSelected = [...selected];
        newSelected[index] = !newSelected[index];
        setSelected(newSelected);
        if (!newSelected.includes(false)) {
            setSelectedAll(true);
        } else {
            setSelectedAll(false);
        }
    };

    const handleFacultadChange = (e) => {
        setFacultad(e.target.value);
        setPrograma('');
        setFilter((prevFilter) => ({
            ...prevFilter,
            facultad: e.target.value,
            programa: '',
        }));
    };

    const handleProgramaChange = (e) => {
        setPrograma(e.target.value);
        setFilter((prevFilter) => ({
            ...prevFilter,
            programa: e.target.value,
        }));
    };

    const facultadOptions = data.facultades.map((facultad) => (
        <option key={facultad.id} value={facultad.id}>
            {facultad.nombre}
        </option>
    ));

    const programasDeFacultad = facultad
        ? data.facultades.find((f) => f.id === parseInt(facultad))?.programas || []
        : [];

    const programaOptions = programasDeFacultad.map((programa) => (
        <option key={programa.id} value={programa.id}>
            {programa.nombre}
        </option>
    ));

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const filteredSolicitudes = solicitudes.filter((solicitud) => {
        const fechaSolicitud = new Date(solicitud.fecha_solicitud);
        const fechaInicio = filter.fechaInicio ? new Date(filter.fechaInicio) : null;
        const fechaFin = filter.fechaFin ? new Date(filter.fechaFin) : null;
        return (
            (filter.facultad === '' || solicitud.facultad === filter.facultad) &&
            (filter.programa === '' || solicitud.programa_academico === filter.programa) &&
            (filter.estado === '' || solicitud.estado === filter.estado) &&
            (!fechaInicio || fechaSolicitud >= fechaInicio) &&
            (!fechaFin || fechaSolicitud <= fechaFin)
        );
    });

    return (
        <div className="pt-6 pl-80 pr-8 w-screen">
            <h1 className="text-2xl text-center text-rojo font-bold mb-4">Solicitudes</h1>
            <div className="flex justify-between mb-4">
                <label className="block text-rojo font-semibold">
                    Facultad:
                    <select className="ml-2 p-2 border rounded"
                        id="facultad"
                        type="text"
                        value={facultad}
                        onChange={handleFacultadChange}
                        disabled={user_type === '2' || user_type === '3' || user_type === '4'}
                    >
                        <option>Seleccionar</option>
                        {facultadOptions}
                    </select>
                </label>
                <label className="block text-rojo font-semibold">
                    Programa académico:
                    <select className="ml-2 p-2 border rounded"
                        id="programa"
                        type="text"
                        value={programa}
                        onChange={handleProgramaChange}
                        disabled={!facultad || user_type === '2' || user_type === '3'}
                    >
                        <option value="">{!facultad ? 'Primero seleccione la facultad' : 'Seleccione al que pertenece'}</option>
                        {programaOptions}
                    </select>
                </label>
                <label className="block text-rojo font-semibold">
                    Estado:
                    <select
                        className="ml-2 p-2 border rounded"
                        id="estado"
                        name="estado"
                        value={filter.estado}
                        onChange={handleFilterChange}
                    >
                        <option value="">Seleccionar</option>
                        <option value="Existente">Existente</option>
                        <option value="En tramite">En trámite</option>
                        <option value="Inexistente">Inexistente</option>
                        <option value="Sin revisar">Sin revisar</option>
                    </select>
                </label>
                <div className='flex'>
                    <label className="block text-rojo font-semibold pr-5">
                        Fecha inicio:
                        <input
                            type="date"
                            className="ml-2 p-2 border rounded"
                            id="fechaInicio"
                            name="fechaInicio"
                            value={filter.fechaInicio}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label className="block text-rojo font-semibold">
                        Fecha fin:
                        <input
                            type="date"
                            className="ml-2 p-2 border rounded"
                            id="fechaFin"
                            name="fechaFin"
                            value={filter.fechaFin}
                            onChange={handleFilterChange}
                        />
                    </label>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Título</th>
                        <th className="py-2 px-4 border-b">Autor</th>
                        <th className="py-2 px-4 border-b">Editorial</th>
                        <th className="py-2 px-4 border-b">Edición</th>
                        <th className="py-2 px-4 border-b">Ejemplares</th>
                        <th className="py-2 px-4 border-b">Año publicación</th>
                        <th className="py-2 px-4 border-b">Idioma</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">
                            <div className="flex items-center justify-center">
                                Seleccionar
                                <input
                                    type="checkbox"
                                    className="ml-2"
                                    checked={selectedAll}
                                    onChange={handleSelectAll}
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSolicitudes.map((solicitud, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.titulo}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.autor}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.editorial}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.edicion}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.ejemplares}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.fecha_publicacion}</td>
                            <td className="py-2 px-4 border-b text-center">{solicitud.libro.idioma}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <span
                                    className={`inline-block w-4 h-4 rounded-full ${solicitud.estado === 'Existente'
                                        ? 'bg-green-500'
                                        : solicitud.estado === 'En tramite'
                                            ? 'bg-yellow-500'
                                            : solicitud.estado === 'Inexistente'
                                                ? 'bg-red-500'
                                                : 'bg-gray-500'
                                        }`}
                                ></span>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <input type="checkbox"
                                    checked={selected[index]}
                                    onChange={() => handleSelect(index)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button className="bg-black text-white py-2 px-4 rounded flex items-center">
                    <span className="material-icons mr-2">Icono</span>
                    Descargar
                </button>
                <div className="flex">
                    {showRechazarButton && (
                        <button className="bg-gray-400 text-white py-2 px-4 rounded mr-2">
                            <span className="material-icons mr-2">Icono</span>
                            Rechazar
                        </button>
                    )}
                    {selectedOption === 'solicitudes' && (
                        <button className="bg-rojo text-white py-2 px-4 rounded flex items-center">
                            <span className="material-icons mr-2">Icono</span>
                            {!showRechazarButton ? 'Enviar seleccionadas' : 'Adquirir y comunicar'}
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

Table.propTypes = {
    userData: PropTypes.object.isRequired,
    solicitudes: PropTypes.array.isRequired,
    selectedOption: PropTypes.string.isRequired,
};

export default Table;