import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  idEmpleado: 0, 
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ID_EMPLEADO':
      return { ...state, idEmpleado: action.payload };
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
