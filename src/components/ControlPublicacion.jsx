import { useEffect, useState } from 'react';
import axios from 'axios';
import Publicacion from './Publicacion';
import FormularioPublicacion from './FormularioPublicacion';
import { useSession } from '../hooks/SessionContext';
import toast from 'react-hot-toast';
import { AddIcon } from '../assets/svg/SvgIcon';
import config from '../../config.js';

const pagesToShow = 5;  // Número de botones de página a mostrar a la vez

const ControlPublicacion = () => {
    const isDashboard = location.pathname === '/dashboard';
    const { state } = useSession();
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadData, setReloadData] = useState(null);

    const [showFormPublicacion, setShowFormPublicacion] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const openFormPublicacion = () => {
        setShowFormPublicacion(true);
    };

    const closeFormPublicacion = () => {
        setShowFormPublicacion(false);
        setReloadData(Date.now());
    };

    const fetchPublicaciones = async (page) => {
        const response = await axios.get(`${config.backendUrl}/api/materialbibliografico/publicacion_public/?page=${page}`);
        return response.data;
    };

    const deletePublicacion = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.delete(`${config.backendUrl}/api/materialbibliografico/publicacion/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.mensaje);
            setReloadData(Date.now());
            return response.data;
        } catch (error) {
            toast.error(error.data.mensaje);
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const publicacionesResponse = await fetchPublicaciones(currentPage);
                setPublicaciones(publicacionesResponse.results);
                setTotalPages(publicacionesResponse.total_pages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, reloadData]);

    if (loading) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Cargando...</div>;
    }

    if (error) {
        return <div className="pt-32 pl-80 pr-8 w-screen">Error: {error}</div>;
    }

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
        <div className={`${isDashboard ? 'ml-80 mr-8 mt-32' : 'ml-8 mr-8 mt-32'}`}>
            <button onClick={() => openFormPublicacion()} className="fixed bottom-5 right-5 bg-rojo text-white py-2 px-4 rounded items-center w-fit duration-300 hover:scale-105 font-bold stroke-white fill-white">
                <AddIcon size={32} />
            </button>
            <div className="bg-white border shadow-md rounded-lg max-w-6xl py-6 px-10 mx-auto flex flex-col items-center">
                <h2 className="text-rojo text-3xl font-bold mb-6 text-center">{isDashboard ? 'Gestión de publicaciones' : 'Publicaciones'}</h2>
                {publicaciones.map(publicacion => (
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
                {renderPageButtons()}
            </div>
        </div>
    );
}

export default ControlPublicacion;
