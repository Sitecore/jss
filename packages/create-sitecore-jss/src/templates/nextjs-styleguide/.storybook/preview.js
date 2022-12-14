import { RouterContext } from 'next/dist/shared/lib/router-context';

import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/app.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    // Process regular links after the render process
    setTimeout(() => {
      document
        .querySelectorAll('a')
        .forEach((a) => a.addEventListener('click', (ev) => ev.preventDefault()));
    }, 0);


    // Process nextjs links
    return (
      <RouterContext.Provider
        value={{
          push: () => Promise.resolve(),
          replace: () => Promise.resolve(),
          prefetch: () => Promise.resolve(),
        }}
      >
        <Story />
      </RouterContext.Provider>
    );
  },
];
