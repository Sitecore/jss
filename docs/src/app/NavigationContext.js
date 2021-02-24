import React, { createContext, useContext, useState } from 'react';

export const NavigationStateReactContext = createContext();

export function useNavigationState() {
  return useContext(NavigationStateReactContext);
}

export const NavigationStateContext = ({
  children,
  value,
}) => {
  const [navState, setNavState] = useState(new Set());
  return (
    <NavigationStateReactContext.Provider value={{navState, setNavState}}>
      {children}
    </NavigationStateReactContext.Provider>
  );
}