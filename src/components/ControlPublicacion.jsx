import { useEffect, useState } from 'react';
import axios from 'axios';
import Publicacion from './Publicacion';
import FormularioPublicacion from './FormularioPublicacion';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/SessionContext';

const ControlPublicacion = () => {

    const isDashboard = location.pathname === '/dashboard';
    const { state } = useSession();
    const navigate = useNavigate()
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadData, setReloadData] = useState()

    const [showFormPublicacion, setShowFormPublicacion] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const publicacionesPerPage = 10;

    const indexOfLastPublicacion = currentPage * publicacionesPerPage;
    const indexOfFirstPublicacion = indexOfLastPublicacion - publicacionesPerPage;
    const currentPublicaciones = publicaciones.slice(indexOfFirstPublicacion, indexOfLastPublicacion);

    const totalPages = Math.ceil(publicaciones.length / publicacionesPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const openFormPublicacion = () => {
        setShowFormPublicacion(true)
    }

    const closeFormPublicacion = () => {
        setShowFormPublicacion(false)
        setReloadData(Date.now())
    };

    const fetchPublicaciones = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/materialbibliografico/publicacion_public/');
        return response.data;
    };

    const deletePublicacion = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.delete(`http://127.0.0.1:8000/api/materialbibliografico/publicacion/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Publicación eliminada')
            setReloadData(Date.now())
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la publicación:', error);
            alert('Error al eliminar la publicación')
            setError(error.message);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const publicacionesResponse = await fetchPublicaciones();
                setPublicaciones(publicacionesResponse.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError(error.message);
                setLoading(false);
                navigate('/')
            }
        }
        fetchData();
    }, [reloadData]);

    if (loading) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Cargando...</div>;
    }

    if (error) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Error: {error}</div>;
    }

    return (
        <div className={`${isDashboard ? 'ml-80 mr-8 mt-32' : 'ml-8 mr-8 mt-32'}`}>
            <button onClick={() => openFormPublicacion()} className="fixed bottom-5 right-5 bg-rojo text-white py-2 px-4 rounded items-center w-fit duration-300 hover:scale-105 font-bold">
                <span className="material-icons mr-2">Icono</span>
                +
            </button>
            <div className="bg-white border shadow-md rounded-lg max-w-fit py-6 px-10 mx-auto flex flex-col items-center">
                <h2 className="text-rojo text-3xl font-bold mb-6 text-center">{isDashboard ? 'Gestión de publicaciones' : 'Publicaciones'}</h2>
                {currentPublicaciones.map(publicacion => (
                    <Publicacion
                        key={publicacion.id}
                        id={publicacion.id}
                        titulo={publicacion.titulo}
                        descripcion={publicacion.descripcion}
                        imagen={publicacion.imagen}
                        onDelete={deletePublicacion}
                        state={state}
                    />
                ))}
            </div>
            {showFormPublicacion && (
                <FormularioPublicacion
                    onClose={closeFormPublicacion}
                />
            )}
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
}

export default ControlPublicacion;
