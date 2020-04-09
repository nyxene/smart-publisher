import React from 'react';

interface AppContextValue {}

const INITIAL_APP_CONTEXT = {};

const AppContext = React.createContext<AppContextValue>(INITIAL_APP_CONTEXT);

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactElement }) => {
    return React.createElement(
        AppContext.Provider,
        {
            value: {}
        },
        children
    );
};
