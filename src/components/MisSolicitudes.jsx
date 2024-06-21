import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import config from "../../config";
import toast from "react-hot-toast";
import { Tooltip } from 'react-tooltip'

const pagesToShow = 5;  // Número de botones de página a mostrar a la vez

function MisSolicitudes({ closeForm }) {
    const [email, setEmail] = useState("");
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchSolicitudes(1);
    };

    const fetchSolicitudes = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.backendUrl}/api/materialbibliografico/solicitud_public/?email=${email}&page=${page}`);
            const { results, total_pages } = response.data;
            setSolicitudes(results);
            setTotalPages(total_pages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setSolicitudes('')
            toast.error(error.response.data.mensaje);
        }
    };

    useEffect(() => {
        if (email !== "") {
            fetchSolicitudes(currentPage);
        }
    }, [currentPage]);

    const renderPageButtons = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (currentPage > 1) {
            pages.push(
                <button key="prev" onClick={() => setCurrentPage(currentPage - 1)} className="mx-1 px-3 py-1 border rounded bg-white text-rojo">
                    &laquo;
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? 'bg-rojo text-white' : 'bg-white text-rojo'}`}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => setCurrentPage(currentPage + 1)} className="mx-1 px-3 py-1 border rounded bg-white text-rojo">
                    &raquo;
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-rojo text-white font-bold py-2 px-4 rounded mt-4 hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                        Consultar
                    </button>
                    <button
                        className="bg-gray-400 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-gray-600 focus:outline-none focus:shadow-outline ml-4"
                        onClick={closeForm}
                    >
                        Cerrar
                    </button>
                </form>

                {loading && <p>Cargando...</p>}

                {solicitudes.length > 0 && (
                    <div className='h-fit'>
                        <div className="flex items-center justify-center mb-4 border rounded w-fit p-4 m-auto">
                            <div className="flex items-center mr-4">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                                <span>Existente</span>
                            </div>
                            <div className="flex items-center mr-4">
                                <span className="inline-block w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                                <span>En trámite</span>
                            </div>
                            <div className="flex items-center mr-4">
                                <span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                                <span>Inexistente</span>
                            </div>
                            <div className="flex items-center">
                                <span className="inline-block w-4 h-4 rounded-full bg-gray-500 mr-2"></span>
                                <span>Sin revisar</span>
                            </div>
                            <div className="flex items-center">
                                <span
                                    data-tooltip-id="info"
                                    data-tooltip-content='Contenido de la anotación'
                                    data-tooltip-place="top"
                                    className="inline-block ml-2 mr-2 p-1  cursor-pointer border rounded-full"
                                >?</span>
                                <span>Motivo de la solicitud del libro</span>
                            </div>


                        </div>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Título</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Autor</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Editorial</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Edición</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Ejemplares</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Año Publicación</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Idioma</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Fecha de Solicitud</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solicitudes.map(solicitud => (
                                    <tr key={solicitud.id}>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.titulo}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.autor}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.editorial}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.edicion}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.ejemplares}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.fecha_publicacion}
                                            <span
                                                data-tooltip-id="info"
                                                data-tooltip-content={
                                                    'Anotación: ' + solicitud.anotacion
                                                }
                                                data-tooltip-place="top"
                                                className="inline-block ml-2 p-1 cursor-pointer border rounded-full"
                                            >
                                                ?
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.libro.idioma}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">{solicitud.fecha_solicitud}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 bg-white text-sm text-center">
                                            {<span
                                                className={`inline-block w-4 h-4 rounded-full ${solicitud.estado === 'Existente'
                                                    ? 'bg-green-500'
                                                    : solicitud.estado === 'En tramite'
                                                        ? 'bg-yellow-500'
                                                        : solicitud.estado === 'Inexistente'
                                                            ? 'bg-red-500'
                                                            : 'bg-gray-500'
                                                    }`}
                                            ></span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Tooltip id="info" />
                        <div className="flex justify-center mt-4 mb-4">
                            {renderPageButtons()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

MisSolicitudes.propTypes = {
    closeForm: PropTypes.func.isRequired
};

export default MisSolicitudes;