import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { CustomersTable } from './components/CustomersTable.tsx';
import CustomerDetail from './components/CustomerDetail.tsx';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CustomersTable />,
      },
      {
        path: "customers/:id/",
        element: <CustomerDetail />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Flowbite theme={theme}>

      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>,
)
