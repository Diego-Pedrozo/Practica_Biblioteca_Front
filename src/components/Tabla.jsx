import PropTypes from 'prop-types';
import data from '../utils/programas.json';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormularioEstado from './FormularioEstado';
import FormularioNotificacion from './FormularioNotificacion'
import { DownloadIcon, SendIcon, DeclineIcon } from '../assets/svg/SvgIcon';
import toast from 'react-hot-toast';

const Table = ({ userData, selectedOption }) => {
    const user_type = userData.information.user_type;
    const user_facultad = userData.information.user_facultad || '';
    const user_programa = userData.information.user_programa || '';
    const showRechazarButton = user_type !== '2' && user_type !== '3' && user_type !== '4' && user_type !== '5';


    const navigate = useNavigate()
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAll, setSelectedAll] = useState(false);
    const [selected, setSelected] = useState(solicitudes.map(() => false));
    const [facultad, setFacultad] = useState(user_facultad);
    const [programa, setPrograma] = useState(user_programa);
    const [estado, setEstado] = useState('Inexistente');
    const [nivelRevision, setNivelRevision] = useState('1');
    const [filter, setFilter] = useState({
        fechaInicio: '',
        fechaFin: '',
    });

    const [showForm, setShowForm] = useState(false);
    const [showFormNotificacion, setShowFormNotificacion] = useState(false);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [selectedSolicitudes, setSelectedSolicitudes] = useState([])
    const [reloadData, setReloadData] = useState()

    const handleEstadoClick = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setShowForm(true);
    };

    const formNotificacion = () => {
        setShowFormNotificacion(true)
    }

    const closeForm = () => {
        setShowForm(false);
        setSelectedSolicitud(null);
    };

    const closeFormNotificacion = () => {
        setShowFormNotificacion(false)
        setReloadData(Date.now())
    };

    const saveEstado = async (id, nuevoEstado) => {
        try {
            const token = localStorage.getItem('authToken');
            const data = {
                "estado": nuevoEstado,
            };
            const response = await axios.patch(`http://127.0.0.1:8000/api/materialbibliografico/solicitud/${id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.mensaje)
            setReloadData(Date.now())
        } catch (error) {
            toast.error('Error al actualizar el estado')
        }
    }

    const fetchSolicitudes = async (option, token) => {
        let endpoint = '';
        if (option === 'solicitudes') {
            endpoint = 'http://127.0.0.1:8000/api/materialbibliografico/solicitud/solicitudes_revisadas/';
        }
        if (option === 'vicerrectoria') {
            endpoint = 'http://127.0.0.1:8000/api/materialbibliografico/solicitud/solicitudes_revisadas/';
        }

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                facultad: facultad,
                programa: programa,
                estado: estado,
                nivel_revision: nivelRevision,
            },
        });
        return response.data;
    };

    const enviarSolicitudes = async (ids_solicitudes) => {
        try {
            const token = localStorage.getItem('authToken');
            const data = {
                "ids_solicitudes": ids_solicitudes,
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/materialbibliografico/solicitud/enviar_solicitudes/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Solicitudes enviadas')
            setReloadData(Date.now())
        } catch (error) {
            toast.error('Error al enviar solicitudes, seleccionelas y vuelva a intentar')
        }
    };

    const rechazarSolicitudes = async (ids_solicitudes) => {
        try {
            const token = localStorage.getItem('authToken');
            const data = {
                "ids_solicitudes": ids_solicitudes,
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/materialbibliografico/solicitud/rechazar_solicitudes/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Solicitudes rechazadas')
            setReloadData(Date.now())
        } catch (error) {
            toast.error('Error al rechazar solicitudes, seleccionelas y vuelva a intentar')
        }
    };

    const generarReporte = async (params) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/api/materialbibliografico/solicitud/generar_reporte/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_solicitudes.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('Reporte generado')
        } catch (error) {
            toast.error('Error al generar el reporte')
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const solicitudesResponse = await fetchSolicitudes(selectedOption, token);
                setSolicitudes(solicitudesResponse);
                setSelected(solicitudesResponse.map(() => false));
                setSelectedAll(false)
                setSelectedSolicitudes([])
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                navigate('/')
            }
        }
        if (user_facultad) {
            setFacultad(user_facultad);
            if (user_programa) {
                setPrograma(user_programa);
            }
        }
        fetchData();
    }, [reloadData, facultad, programa, estado, nivelRevision]);

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll);
        setSelected(solicitudes.map(() => !selectedAll));

        const newSelectedAll = !selectedAll;
        if (newSelectedAll) {
            const allIds = solicitudes.map(solicitud => solicitud.id);
            setSelectedSolicitudes(allIds);
        } else {
            setSelectedSolicitudes([]);
        }
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

        const selectedId = solicitudes[index].id;
        if (newSelected[index]) {
            setSelectedSolicitudes((prevSelectedSolicitudes) => [
                ...prevSelectedSolicitudes,
                selectedId
            ]);
        } else {
            setSelectedSolicitudes((prevSelectedSolicitudes) =>
                prevSelectedSolicitudes.filter(id => id !== selectedId)
            );
        }
    };

    const handleFacultadChange = (e) => {
        setFacultad(e.target.value);
        setPrograma('');
    };

    const handleProgramaChange = (e) => {
        setPrograma(e.target.value);
    };

    const handleEstadoChange = (e) => {
        setEstado(e.target.value);
    };

    const handleNivelRevisionChange = (e) => {
        setNivelRevision(e.target.value);
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
            (!fechaInicio || fechaSolicitud >= fechaInicio) &&
            (!fechaFin || fechaSolicitud <= fechaFin)
        );
    });

    if (loading) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Cargando...</div>;
    }

    if (error) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Error: {error}</div>;
    }

    return (
        <div className="pt-32 pl-80 pr-8 w-screen">
            <h1 className="text-2xl text-center text-rojo font-bold mb-4">Solicitudes</h1>
            <div className="flex justify-between my-4 h-24">
                <div className='flex flex-col justify-between'>
                    <label className="block text-rojo font-semibold">
                        Facultad:
                        <select className="ml-2 p-2 border rounded"
                            id="facultad"
                            type="text"
                            value={facultad}
                            onChange={handleFacultadChange}
                            disabled={user_type === '2' || user_type === '3' || user_type === '4'}
                        >
                            <option value="">Seleccionar</option>
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
                            <option value="">{!facultad ? 'Primero seleccione la facultad' : 'Seleccionar'}</option>
                            {programaOptions}
                        </select>
                    </label>
                </div>
                <div className='flex flex-col justify-between'>
                    {selectedOption === 'solicitudes' && (
                        <label className="block text-rojo font-semibold">
                            Estado libro:
                            <select
                                className="ml-2 p-2 border rounded"
                                id="estado"
                                name="estado"
                                value={estado}
                                onChange={handleEstadoChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="Existente">Existente</option>
                                <option value="En tramite">En trámite</option>
                                <option value="Inexistente">Inexistente</option>
                                <option value="Sin revisar">Sin revisar</option>
                            </select>
                        </label>
                    )}
                    {selectedOption === 'solicitudes' && (
                        <label className="block text-rojo font-semibold">
                            Estado revisión:
                            <select
                                className="ml-2 p-2 border rounded"
                                id="revision"
                                name="revision"
                                value={nivelRevision}
                                onChange={handleNivelRevisionChange}
                            >
                                <option value="1">Recibidas</option>
                                {user_type !== '6' && (<option value="2">Enviadas</option>)}
                                <option value="5">{user_type === '6' ? 'Aprobadas' : 'Aprobadas por vicerrector'}</option>
                                <option value="6">{user_type === '6' ? 'Rechazadas' : 'Rechazadas por vicerrector'}</option>
                            </select>
                        </label>
                    )}
                </div>
                <div className='flex flex-col justify-between'>
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
            {showForm && (
                <FormularioEstado
                    solicitud={selectedSolicitud}
                    onClose={closeForm}
                    onSave={saveEstado}
                />
            )}
            {showFormNotificacion && (
                <FormularioNotificacion
                    solicitudes={selectedSolicitudes}
                    onClose={closeFormNotificacion}
                />
            )}
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
                        {(((user_type === '5' || user_type === '6') && estado === 'Inexistente' && nivelRevision === '1') || ((user_type === '2' || user_type === '3' || user_type === '4') && estado === 'Sin revisar' && nivelRevision === '1')) && (
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
                        )}
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
                                {
                                    user_type === '5' ? (
                                        <button onClick={() => handleEstadoClick(solicitud)}>
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
                                        </button>
                                    ) : (
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
                                    )
                                }
                            </td>
                            {(((user_type === '5' || user_type === '6') && estado === 'Inexistente' && nivelRevision === '1') || ((user_type === '2' || user_type === '3' || user_type === '4') && estado === 'Sin revisar' && nivelRevision === '1')) && (
                                <td className="py-2 px-4 border-b text-center">
                                    <input type="checkbox"
                                        checked={selected[index]}
                                        onChange={() => handleSelect(index)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button onClick={() => generarReporte({ facultad: facultad, programa: programa, estado: estado, nivel_revision: nivelRevision })} className="bg-black text-white py-2 px-4 rounded flex items-center font-bold stroke-white fill-white gap-2 duration-300 hover:scale-105">
                    <DownloadIcon size={32} />
                    Descargar
                </button>
                <div className="flex gap-5">
                    {showRechazarButton && (
                        <button onClick={() => rechazarSolicitudes(selectedSolicitudes)} className="bg-gray-400 text-white py-2 px-4 rounded flex items-center font-bold stroke-white fill-white gap-2 duration-300 hover:scale-105">
                            <DeclineIcon size={32} />
                            Rechazar
                        </button>
                    )}
                    {user_type !== '6' && (
                        <button onClick={() => enviarSolicitudes(selectedSolicitudes)} className="bg-rojo text-white py-2 px-4 rounded flex items-center font-bold stroke-white fill-white gap-2 duration-300 hover:scale-105">
                            <SendIcon size={32} />
                            {!showRechazarButton ? 'Enviar seleccionadas' : 'Adquirir y comunicar'}
                        </button>
                    )}
                    {user_type === '6' && (
                        <button onClick={() => formNotificacion()} className="bg-rojo text-white py-2 px-4 rounded flex items-center font-bold stroke-white fill-white gap-2 duration-300 hover:scale-105">
                            <SendIcon size={32} />
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
    selectedOption: PropTypes.string.isRequired,
};

export default Table;