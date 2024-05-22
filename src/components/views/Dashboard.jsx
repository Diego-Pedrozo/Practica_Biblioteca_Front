import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'
import Tabla from '../Tabla'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate()
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('solicitudes');
    const [userData, setUserData] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const fetchSolicitudes = async (option, token) => {
        let endpoint = '';
        if (option === 'solicitudes') {
            endpoint = 'http://127.0.0.1:8000/api/materialbibliografico/solicitud/';
        }
        if (option === 'vicerrectoria') {
            endpoint = 'http://127.0.0.1:8000/api/materialbibliografico/solicitud/solicitudes_revisadas/';
        }

        const response = await axios.get(endpoint, {
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

                // Solicitar datos del usuario
                const userDataResponse = await axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(userDataResponse.data[0]);

                const solicitudesResponse = await fetchSolicitudes(selectedOption, token);
                setSolicitudes(solicitudesResponse);
                setLoading(false);
            } catch (error) {
                // Manejar errores
                console.error('Error al obtener los datos:', error);
                setError(error.message);
                setLoading(false);
                navigate('/')
            }
        };

        fetchData();
    }, [selectedOption]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className='flex justify-center'>
                <Sidebar onOptionChange={handleOptionChange} userData={userData} />
                <div className='flex-1'>
                    {selectedOption === 'solicitudes' && <Tabla solicitudes={solicitudes} userData={userData} selectedOption={selectedOption} />}
                    {selectedOption === 'vicerrectoria' && <Tabla solicitudes={solicitudes} userData={userData} selectedOption={selectedOption} />}
                </div>
            </div>
        </>
    )
}

export default Dashboard