import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: undefined,
        children: [
            {
                id: "Dashboard",
                index: true,
                path: "",
                element: undefined,
            },
            {
                id: "Clientes",
                path: "customers",
                element: undefined,
                handle: {
                    crumb: (id: string) => id
                },
                children: [
                    {
                        id: "customer",
                        path: ":idCustomer",
                        element: undefined,
                        handle: {
                            crumb: (id: string, params:any) => params.idCustomer.toString()
                        }
                    }
                ]
            },
            {
                id: "Pagos",
                path: "payments",
                element: undefined,
                handle: {
                    crumb: (id: string) => id
                }
            },
            {
                id: "Configuración",
                path: "settings",
                element: undefined,
                handle: {
                    crumb: (id: string) => id
                }
            },
        ]
    }
]

