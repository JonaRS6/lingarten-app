import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import Customers from './pages/Customers.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Customer from './pages/Customer.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/:id",
        element: <Customer />
      }
    ],
  },
]);

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      blue: "bg-blue-500",
    }
  }

}
// Create a client
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
