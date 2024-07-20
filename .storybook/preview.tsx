import type { Preview } from "@storybook/react";
import '../src/index.css';
import React from 'react';
import { ThemeProvider } from '../src/components/theme-provider';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';
import { routes } from '../src/router';

import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    reactRouter: reactRouterParameters({
      routing: {
        useStoryElement: true,
        ...routes[0] as any,
      },
    }),
  },
  loaders: [mswLoader],
  decorators: [
    withRouter,
    withThemeByClassName({
      themes: {
        // nameOfTheme: 'classNameForTheme',
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Story />
      </ThemeProvider>
    ),
  ]
};

export default preview;
