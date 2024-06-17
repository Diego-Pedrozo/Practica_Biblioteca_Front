import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../../config';

const pagesToShow = 5;  // Número de botones de página a mostrar a la vez

const Notificacion = () => {

    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchNotificaciones = async (token, page) => {
        const response = await axios.get(`${config.backendUrl}/api/materialbibliografico/notificacion/?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const notificacionesResponse = await fetchNotificaciones(token, currentPage);
                setNotificaciones(notificacionesResponse.results);
                setTotalPages(notificacionesResponse.total_pages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
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

    if (loading) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Cargando...</div>;
    }

    if (error) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Error: {error}</div>;
    }

    return (
        <div className='ml-80 mr-8 mt-32'>
            <div className="bg-white border shadow-md rounded-lg max-w-4xl py-6 px-10 mx-auto">
                <h2 className="text-rojo text-3xl font-bold mb-6 text-center">Notificaciones</h2>
                {notificaciones.map((notificacion, index) => (
                    <div key={index} className="flex items-start mb-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-pink-200 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-pink-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a6 6 0 00-6 6v2.586l-1.293 1.293a1 1 0 001.414 1.414l1.293-1.293V8a4 4 0 118 0v4a4 4 0 01-8 0V8a6 6 0 016-6zm-4 8V8a4 4 0 118 0v4a6 6 0 01-6 6V6a2 2 0 00-2 2v2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-lg font-semibold text-gray-800 text-justify">{notificacion.descripcion}</p>
                            <div className='flex items-start'>
                                {notificacion.archivo && <a href={notificacion.archivo} className="text-sm text-gray-500">Archivo adjunto</a>}
                                <div className="text-sm text-gray-500 ml-auto">{notificacion.fecha_notificacion}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 mb-4">
                {renderPageButtons()}
            </div>
        </div>
    );
};

export default Notificacion;
