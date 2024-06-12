import { useState } from "react";
import data from '../utils/programas.json';
import axios from "axios";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

FormularioSolicitud.propTypes = {
    closeForm: PropTypes.func.isRequired
};

function FormularioSolicitud({ closeForm }) {

    const [year, setYear] = useState('');
    const currentYear = new Date().getFullYear();
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [edicion, setEdicion] = useState('');
    const [idioma, setIdioma] = useState('');
    const [ejemplares, setEjemplares] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [facultad, setFacultad] = useState('');
    const [programa, setPrograma] = useState('');
    const [anotacion, setAnotacion] = useState('');
    const [formValid, setFormValid] = useState(false);

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const optionsYear = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
        optionsYear.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    const handleTituloChange = (e) => {
        setTitulo(e.target.value);
    };
    const handleAutorChange = (e) => {
        setAutor(e.target.value);
    };
    const handleEditorialChange = (e) => {
        setEditorial(e.target.value);
    };
    const handleEdicionChange = (e) => {
        setEdicion(e.target.value);
    };
    const handleIdiomaChange = (e) => {
        setIdioma(e.target.value);
    };
    const handleEjemplaresChange = (e) => {
        setEjemplares(e.target.value);
    };
    const handleSolicitanteChange = (e) => {
        setSolicitante(e.target.value);
    };
    const handleAnotacionChange = (e) => {
        setAnotacion(e.target.value);
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
        if (titulo && autor && editorial && edicion && year && idioma && ejemplares && solicitante && facultad && programa) {
            setFormValid(true);
            const formData = {
                "libro": {
                    "titulo": titulo,
                    "autor": autor,
                    "editorial": editorial,
                    "edicion": edicion,
                    "ejemplares": ejemplares,
                    "fecha_publicacion": year,
                    "idioma": idioma
                },
                "solicitud": {
                    "facultad": facultad,
                    "programa_academico": programa,
                    "anotacion": anotacion,
                    "solicitante": solicitante
                }
            };
            axios.post('http://127.0.0.1:8000/api/materialbibliografico/solicitud_public/', formData)
                .then(response => {
                    // Maneja la respuesta del servidor si es necesario
                    closeForm()
                    toast.success(response.data.mensaje)
                })
                .catch(error => {
                    // Maneja el error si la solicitud falla
                    closeForm()
                    toast.error(error.data.mensaje)
                });
        } else {
            setFormValid(false);
            toast.error('Por favor complete todos los campos')
        }
    };

    return (
        <div className="fixed bottom-20 right-5 bg-white p-6 rounded-lg shadow-lg w-96 h-3/6 border-2 border-red-500 overflow-auto" >
            <h2 className="text-2xl mb-4 text-rojo font-bold text-center">Crear solicitud</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="titulo">
                        Título
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={handleTituloChange}
                        placeholder="Ingrese un título"
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="autor">
                        Autor
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="autor"
                        type="text"
                        value={autor}
                        onChange={handleAutorChange}
                        placeholder="Ingrese el autor"
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="editorial">
                        Editorial
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="editorial"
                        type="text"
                        value={editorial}
                        onChange={handleEditorialChange}
                        placeholder="Agregue la editorial"
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="edicion">
                        Edición
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="edicion"
                        type="text"
                        value={edicion}
                        onChange={handleEdicionChange}
                        placeholder="Agregue la edición"
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="año">
                        Año de Publicación
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="año"
                        type="number"
                        value={year}
                        onChange={handleYearChange}
                        placeholder="Agregue el año de publicación"
                    >
                        <option value="">Seleccione el año de publicación</option>
                        {optionsYear}
                    </select>

                </div>
                {year && (currentYear - year > 10) && (
                    <div>
                        <label className="block text-rojo font-semibold mb-1" htmlFor="anotacion">
                            Anotación
                        </label>
                        <input
                            className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="anotacion"
                            type="text"
                            value={anotacion}
                            onChange={handleAnotacionChange}
                            placeholder="Por qué necesita este libro?"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="idioma">
                        Idioma
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="idioma"
                        type="text"
                        value={idioma}
                        onChange={handleIdiomaChange}
                        placeholder="Seleccione el idioma del libro"
                    >
                        <option value="">Seleccione el idioma</option>
                        <option value="Español">Español</option>
                        <option value="Ingles">Ingles</option>
                    </select>
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
                    >
                        <option value="">{!facultad ? 'Primero seleccione la facultad' : 'Seleccione al que pertenece'}</option>
                        {programaOptions}
                    </select>
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="cantidad">
                        Número de ejemplares
                    </label>
                    <select
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cantidad"
                        type="number"
                        value={ejemplares}
                        onChange={handleEjemplaresChange}
                    >
                        <option value="">Seleccione la cantidad</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
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
                    >
                        <option value="">Seleccione su rol</option>
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                </div>
                <div className="pt-5" >
                    <button
                        type="submit"
                        className="w-full bg-rojo text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                        Enviar
                    </button>
                </div>
                {/* <button
                    className="mt-4 w-full text-red-500 py-2 rounded-full hover:text-red-700 focus:outline-none focus:shadow-outline"
                    onClick={closeForm}
                >
                    Cerrar
                </button> */}
            </form>
        </div>
    );
}

export default FormularioSolicitud;
