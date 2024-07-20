import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: undefined,
        children: [
            {
                id: "dashboard",
                index: true,
                path: "",
                element: undefined,
            },
            {
                id: "customers",
                path: "customers",
                element: undefined,
                children: [
                    {
                        id: "customer",
                        path: ":id",
                        element: undefined,
                    }
                ]
            },
            {
                id: "payments",
                path: "payments",
                element: undefined,
            },
            {
                id: "settings",
                path: "settings",
                element: undefined,
            },
        ]
    }
]

