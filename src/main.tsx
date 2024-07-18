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
import { ThemeProvider } from './components/theme-provider.tsx';

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


// Create a client
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>

    </QueryClientProvider>
  </React.StrictMode>,
)
