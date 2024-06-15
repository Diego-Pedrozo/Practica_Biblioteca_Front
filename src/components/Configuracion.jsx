import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import config from "../../config";

function Configuracion({ userData }) {

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [password, setPassword] = useState(undefined);
    const [documento, setDocumento] = useState(userData.information.identification);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const formData = {
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
            "information": {
                "identification": documento
            }
        }
        try {
            const response = await axios.patch(`${config.backendUrl}/api/user/${userData.id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.mensaje)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response.data.mensaje)
        }

    };

    const roles = {
        1: 'Administrador',
        2: 'Director plan de estudios',
        3: 'Director de departamento',
        4: 'Decano',
        5: 'Biblioteca',
        6: 'Vicerrector',
    };
    const userRole = roles[userData.information.user_type];


    const facultades = {
        1: 'Ciencias Agrarias y del Ambiente',
        2: 'Ciencias Básicas',
        3: 'Ciencias Empresariales',
        4: 'Ciencias de salud',
        5: 'Educación, Artes y Humanidades',
        6: 'Ingeniería',
    }
    const facultad = facultades[userData.information.user_facultad];

    const programas = {
        1: 'Ingeniería Agroindustrial',
        2: 'Ingeniería Agronómica',
        3: 'Ingeniería Ambiental',
        4: 'Ingeniería Biotecnológica',
        5: 'Zootecnia',
        6: 'Química Industrial',
        7: 'Administración de Empresas',
        8: 'Contaduría Pública',
        9: 'Comercio Internacional',
        10: 'Enfermería',
        11: 'Seguridad y Salud en el Trabajo',
        12: 'Comunicación Social',
        13: 'Trabajo Social',
        14: 'Derecho',
        15: 'Arquitectura',
        16: 'Ingeniería Civil',
        17: 'Ingeniería de Sistemas',
        18: 'Ingeniería Electrónica',
        19: 'Ingeniería Electromecánica',
        20: 'Ingeniería Industrial',
        21: 'Ingeniería de Minas',
        22: 'Ingeniería Mecánica',
    };

    const programa = programas[userData.information.user_programa];

    return (
        <div className="pt-32 pb-8 pl-80 pr-8">
            <div className="bg-white border shadow-md rounded-lg max-w-xl py-6 px-10 mx-auto flex flex-col items-center">
                <h2 className="text-rojo text-3xl font-bold mb-6 text-center">Datos del usuario</h2>
                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nombre"
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="Ingrese su nombre"
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="apellido"
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Ingrese su apellido"
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={userData.email}
                            placeholder="Ingrese su email"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Ingrese su nueva contraseña"
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="documento">
                            Documento
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="documento"
                            type="number"
                            value={documento}
                            onChange={handleDocumentoChange}
                            placeholder="Ingrese su documento"
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="rol">
                            Tipo de usuario
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            id="rol"
                            type="text"
                            value={userData.information.user_type ? userRole : 'No aplica'}
                            placeholder="Seleccione su tipo de usuario"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="facultad">
                            Facultad
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            id="facultad"
                            type="text"
                            value={userData.information.user_facultad ? facultad : 'No aplica'}
                            placeholder="Seleccione su facultad"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="programa">
                            Programa académico
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            id="programa"
                            type="text"
                            value={userData.information.user_programa ? programa : 'No aplica'}
                            placeholder="Seleccione su programa"
                            readOnly
                        />
                    </div>
                    <div className="pt-5" >
                        <button
                            type="submit"
                            className="w-full bg-rojo text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Configuracion.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default Configuracion