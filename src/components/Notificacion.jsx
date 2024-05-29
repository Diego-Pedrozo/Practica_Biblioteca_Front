import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notificacion = () => {

    const navigate = useNavigate()
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const notificacionesPerPage = 10;

    const indexOfLastNotificacion = currentPage * notificacionesPerPage;
    const indexOfFirstNotificacion = indexOfLastNotificacion - notificacionesPerPage;
    const currentNotificaciones = notificaciones.slice(indexOfFirstNotificacion, indexOfLastNotificacion);

    const totalPages = Math.ceil(notificaciones.length / notificacionesPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchNotificaciones = async (token) => {
        const response = await axios.get('http://127.0.0.1:8000/api/materialbibliografico/notificacion/', {
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
                const notificacionesResponse = await fetchNotificaciones(token);
                setNotificaciones(notificacionesResponse.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError(error.message);
                setLoading(false);
                navigate('/')
            }
        }
        fetchData();
    }, []);

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
                {currentNotificaciones.map((notificacion, index) => (
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
                                <a href={notificacion.archivo} className="text-sm text-gray-500">Archivo adjunto</a>
                                <div className="text-sm text-gray-500 ml-auto">{notificacion.fecha_notificacion}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 mb-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleClick(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-rojo text-white' : 'bg-white text-rojo'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Notificacion;
