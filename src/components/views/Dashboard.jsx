import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'
import Tabla from '../Tabla'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notificacion from '../Notificacion';
import ControlPublicacion from '../ControlPublicacion';
import Configuracion from '../Configuracion';
import config from '../../../config';

function Dashboard() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('solicitudes');
    const [userData, setUserData] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const userDataResponse = await axios.get(`${config.backendUrl}/api/user/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(userDataResponse.data[0]);
                setLoading(false);
            } catch (error) {
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
                <Sidebar onOptionChange={handleOptionChange} userData={userData} selectedOption={selectedOption} />
                <div className='flex-1'>
                    {selectedOption === 'solicitudes' && <Tabla userData={userData} selectedOption={selectedOption} />}
                    {selectedOption === 'publicaciones' && <ControlPublicacion userData={userData} selectedOption={selectedOption} />}
                    {selectedOption === 'notificaciones' && <Notificacion userData={userData} selectedOption={selectedOption} />}
                    {selectedOption === 'configuracion' && <Configuracion userData={userData} selectedOption={selectedOption} />}
                </div>
            </div>
        </>
    )
}

export default Dashboard