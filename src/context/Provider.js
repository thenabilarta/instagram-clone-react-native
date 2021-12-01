import React, {createContext, useReducer} from 'react';
import authInitialState from './initialStates/authState';
import auth from './reducers/auth';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  // const [contactsState, contactsDispatch] = useReducer(
  //   contacts,
  //   contactsInitialState,
  // );

  return (
    <GlobalContext.Provider
      // value={{authState, contactsState, authDispatch, contactsDispatch}}>
      value={{authState, authDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
