import React, { createContext, useContext, ReactNode } from 'react';
import { ComponentProps } from "../sharedTypes/component-props";

/**
 * Component props context which we are using in order to store data fetched on components level (getStaticProps/getServerSideProps)
 */
export const ComponentPropsReactContext = createContext<ComponentProps>({});

/**
 * Hook in order to get access to props related to specific component. Data comes from ComponentPropsContext.
 * @see ComponentPropsContext
 */
export function useComponentProps<ComponentData>(componentName: string): ComponentData {
  const data = useContext(ComponentPropsReactContext);

  return data[componentName] as ComponentData;
};

export type ComponentPropsContextProps = {
	children: ReactNode;
	value: ComponentProps;
}

export const ComponentPropsContext = ({ children, value }: ComponentPropsContextProps) => (
	<ComponentPropsReactContext.Provider value={value}>
		{children}
	</ComponentPropsReactContext.Provider>
)
