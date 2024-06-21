import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";
import { AddIcon } from '../assets/svg/SvgIcon';
import FormularioPropuesta from './FormularioPropuesta';
import PropTypes from 'prop-types';

const pagesToShow = 5;  // Número de botones de página a mostrar a la vez

const Propuestas = ({ userData }) => {

    const [propuestas, setPropuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFormPropuesta, setShowFormPropuesta] = useState(false);
    const [reloadData, setReloadData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const openFormPropuesta = () => {
        setShowFormPropuesta(true);
    };

    const closeFormPropuesta = () => {
        setShowFormPropuesta(false);
        setReloadData(Date.now());
    };

    const fetchPropuestas = async (token, page) => {
        const response = await axios.get(`${config.backendUrl}/api/materialbibliografico/propuestas_excel/?page=${page}`, {
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
                const propuestasResponse = await fetchPropuestas(token, currentPage);
                setPropuestas(propuestasResponse.results);
                setTotalPages(propuestasResponse.total_pages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [currentPage, reloadData]);

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
            {userData.information.user_type === '5' && (
                <button onClick={() => openFormPropuesta()} className="fixed bottom-5 right-5 bg-rojo text-white py-2 px-4 rounded items-center w-fit duration-300 hover:scale-105 font-bold stroke-white fill-white">
                    <AddIcon size={32} />
                </button>
            )}
            <div className="bg-white border shadow-md rounded-lg w-fit py-6 px-10 mx-auto">
                <h2 className="text-rojo text-3xl font-bold mb-6 text-center">Propuestas bibliográficas</h2>
                {userData.information.user_type === '4' && (
                    <h3 className="text-gray-400 text-lg mb-6 text-center">En los archivos resaltar los libros que desea que se adquieran</h3>
                )}
                {propuestas.map((propuesta, index) => (
                    <div key={index} className="flex items-start mb-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-200 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-blue-600"
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
                            <p className="text-lg font-semibold text-gray-800 text-justify">{propuesta.titulo}</p>
                            <div className='flex items-start'>
                                {propuesta.url && <a href={propuesta.url} className="text-sm text-gray-500" target="_blank" rel="noopener noreferrer">Url excel</a>}
                                <div className="text-sm text-gray-500 ml-auto">{propuesta.uploaded_at}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showFormPropuesta && (
                <FormularioPropuesta
                    onClose={closeFormPropuesta}
                />
            )}
            <div className="flex justify-center mt-4 mb-4">
                {renderPageButtons()}
            </div>
        </div>
    );
};

Propuestas.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default Propuestas;
