import React, { createContext, useContext } from 'react';

interface AppContextValue {}

const INITIAL_APP_CONTEXT = {};

const AppContext = createContext<AppContextValue>(INITIAL_APP_CONTEXT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactElement }) => {
    return React.createElement(
        AppContext.Provider,
        {
            value: {}
        },
        children
    );
};
