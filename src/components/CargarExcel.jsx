import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config";
import data from '../utils/programas.json';

function CargarExcel({ closeForm }) {
    const [file, setFile] = useState(null);
    const [solicitante, setSolicitante] = useState('');
    const [emailSolicitante, setEmailSolicitante] = useState('')
    const [facultad, setFacultad] = useState('');
    const [programa, setPrograma] = useState('');

    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '../src/utils/Plantilla_Solicitudes.xlsx'; // Asegúrate de que el archivo esté en el directorio 'public'
        link.download = 'plantilla_solicitudes.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSolicitanteChange = (e) => {
        setSolicitante(e.target.value);
    };

    const handleEmailSolicitanteChange = (e) => {
        setEmailSolicitante(e.target.value);
    };

    const handleFacultadChange = (e) => {
        setFacultad(e.target.value);
        setPrograma('');
    };

    const handleProgramaChange = (e) => {
        setPrograma(e.target.value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Por favor, seleccione un archivo de Excel.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("facultad", facultad)
        formData.append("programa_academico", programa)
        formData.append("solicitante", solicitante)
        formData.append("email_solicitante", emailSolicitante)

        axios.post(`${config.backendUrl}/api/materialbibliografico/solicitud_public/cargar_varias/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                closeForm();
                toast.success(response.data.mensaje);
            })
            .catch(error => {
                closeForm();
                toast.error(error.response.data.mensaje);
            });
    };

    return (
        <div className="fixed bottom-20 right-5 bg-white p-6 rounded-lg shadow-lg w-96 h-fit border-2 border-rojo overflow-auto">
            <h2 className="text-2xl text-rojo font-bold text-center">Cargar Solicitudes</h2>
            <button
                className="w-full text-black mt-1 mb-4 hover:text-gray-500"
                onClick={handleDownloadTemplate}
            >
                Descargar plantilla
            </button>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="file">
                        Archivo de Excel
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="file"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="facultad">
                        Facultad
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="facultad"
                        type="text"
                        value={facultad}
                        onChange={handleFacultadChange}
                        required
                    >
                        <option value="">Seleccione a la que pertenece</option>
                        {facultadOptions}
                    </select>
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="programa">
                        Programa Académico
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="programa"
                        type="text"
                        value={programa}
                        onChange={handleProgramaChange}
                        disabled={!facultad}
                        required
                    >
                        <option value="">{!facultad ? 'Primero seleccione la facultad' : 'Seleccione al que pertenece'}</option>
                        {programaOptions}
                    </select>
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="solicitante">
                        Rol Solicitante
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="solicitante"
                        type="text"
                        value={solicitante}
                        onChange={handleSolicitanteChange}
                        required
                    >
                        <option value="">Seleccione su rol</option>
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="email">
                        Email Solicitante
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={emailSolicitante}
                        onChange={handleEmailSolicitanteChange}
                        placeholder="Ingrese su email"
                        required
                    />
                </div>
                <div className="pt-5">
                    <button
                        type="submit"
                        className="w-full bg-rojo text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}

CargarExcel.propTypes = {
    closeForm: PropTypes.func.isRequired
};

export default CargarExcel;
