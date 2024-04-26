import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  idEmpleado: 0, 
  direccion: 'localhost',
  puerto: 5500,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ID_EMPLEADO':
      return { ...state, idEmpleado: action.payload };
    case 'SET_DIR':
      return { ...state, direccion: action.payload };
    case 'SET_PORT':
      return { ...state, puerto: action.payload };
    default:
      return state;
  }
};

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
