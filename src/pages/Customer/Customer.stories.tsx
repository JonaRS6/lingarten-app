import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import { http, HttpResponse, delay } from 'msw'
import { Customer } from './Customer';
import { CustomerForm } from './customer-form';
import CustomerProfile from './customer-profile';

const meta = {
  title: 'Pages/Cliente',
  component: Customer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      location: {
        path: '/customers',
      }
    }),
  },
} satisfies Meta<typeof Customer>;

export default meta;
type Story = StoryObj<typeof meta>;

const TestSearchResults = [
  {
    id: 1,
    name: 'Neil Maverick',
    type: 'customer',
  },
  {
    id: 2,
    name: 'John Doe',
    type: 'customer',
  },
  {
    id: 3,
    name: 'Jane Doe',
    type: 'customer',
  },
  {
    id: 4,
    name: 'viaje quinta',
    type: 'receipt',
  },
  {
    id: 5,
    name: 'Basura extra',
    type: 'receipt',
  },
  {
    id: 6,
    name: 'Pago adelantado',
    type: 'receipt',
  },
]

export const Default: Story = {
  parameters: {
  },
};

export const NewForm: Story = {
    parameters: {
        layout: "centered",
    },
    render: () => <CustomerForm />,
};

export const ProfileCard: Story = {
    parameters: {
        layout: "centered",
    },
    render: () => <CustomerProfile customerId='WSVnjHoothqINiUs5Qaw'/>,
}