import { createContext, useReducer, useContext } from 'react';

// Define el estado inicial
const initialState = {
    isLoggedIn: false,
};

// Define el reducer
const sessionReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

// Crea el contexto
const SessionContext = createContext();

// Crea el proveedor del contexto
export const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sessionReducer, initialState);

    return (
        <SessionContext.Provider value={{ state, dispatch }}>
            {children}
        </SessionContext.Provider>
    );
};

// Hook personalizado para usar el contexto de la sesión
export const useSession = () => {
    return useContext(SessionContext);
};
