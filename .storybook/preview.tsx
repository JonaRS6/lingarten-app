import type { Preview } from "@storybook/react";
import '../src/index.css';
import React from 'react';
import { ThemeProvider } from '../src/components/theme-provider';

import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [withThemeByClassName({
    themes: {
      // nameOfTheme: 'classNameForTheme',
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  })
    , (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Story />
      </ThemeProvider>
    ),
  ]
};

export default preview;
