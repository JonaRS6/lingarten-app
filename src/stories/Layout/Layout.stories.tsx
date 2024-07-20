import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters, reactRouterOutlet } from 'storybook-addon-remix-react-router';
import { Layout, Breadcrumbs as BreadcrumbsComponent } from './Layout';
import { routes } from '@/router';

const meta = {
  title: 'Pages/Layout',
  component: Layout,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Breadcrumbs: Story = {
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({
      location: {
        path: '/customers/1',
      }
    }),
  },
  render: () => <BreadcrumbsComponent />
}
