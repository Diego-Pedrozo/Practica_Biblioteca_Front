import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSession } from "../hooks/SessionContext";

FormularioLogin.propTypes = {
    closeForm: PropTypes.func.isRequired,
};

function FormularioLogin({ closeForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useSession();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            setFormValid(true);
            const formData = {
                "username": email,
                "password": password,
            };
            axios.post('http://127.0.0.1:8000/api/auth/token/', formData)
                .then(response => {
                    const token = response.data.access;
                    localStorage.setItem('authToken', token);
                    dispatch({
                        type: 'LOGIN',
                    });
                    closeForm()
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.log(error);
                    alert('Credenciales incorrectas');

                });
        } else {
            console.log(formValid);
            setFormValid(false);
            alert('Por favor complete todos los campos obligatorios.');
        }
    };

    return (
        <div className="fixed top-28 right-5 bg-white p-6 rounded-lg shadow-lg w-96 h-88 border-2 border-red-500 overflow-auto" >
            <h2 className="text-2xl mb-4 text-rojo font-bold text-center">Iniciar Sesión</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="titulo">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Ingrese se email"
                    />
                </div>
                <div>
                    <label className="block text-rojo font-semibold mb-1" htmlFor="autor">
                        Contraseña
                    </label>
                    <input
                        className="shadow appearance-none border border-rojo rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="pt-5" >
                    <button
                        type="submit"
                        className="w-full bg-rojo text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                        Iniciar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioLogin;
