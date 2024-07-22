"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses } from "./data"
import { Customer } from "./schema"
import { DataTableColumnHeader } from "./data-table-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Customer>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: "customer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cliente" />
        ),
        accessorFn: (row) => `${row.name} ${row.lastname} | ${row.street_name} ${row.street_no}, ${row.colony}`,
        cell: ({ row }) => <div className="w-auto">
            <div className="font-medium">
                {`${row.original.name} ${row.original.lastname}`}
            </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
               {` ${row.original.street_name} ${row.original.street_no}, ${row.original.colony}`}
            </div>
        </div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        id: "Teléfono",
        accessorKey: "tel1",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Teléfono" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    {row.getValue("Teléfono")}
                </div>
            )
        },
        enableHiding: true,
    },
    {
        id: "Estatus",
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estatus" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("Estatus")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    <Badge variant={"secondary"}>
                        <div className={`size-2 rounded-full mr-2 
                            ${status.value === "pagado" && "bg-green-500"}
                            ${status.value === "pendiente" && "bg-yellow-500"}
                            ${status.value === "atrasado" && "bg-red-500"}
                            `} />
                        <span>{status.label}</span>
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableHiding: false,
    },
    {
        id: "Fecha de registro",
        accessorKey: "registedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fecha de registro" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("Fecha de registro"))

            return (
                <div className="flex items-center">
                    <span>{date.toLocaleDateString()}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableHiding: true,
    },
    {
        id: "Fecha de cancelación",
        accessorKey: "cancelDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fecha de cancelación" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("Fecha de cancelación"))

            return (
                <div className="flex items-center">
                    <span>{row.getValue("cancelDate") ? date.toLocaleDateString() : "---"}</span>
                </div>
            )
        },
    }, 
    {
        id: "Día de servicio",
        accessorKey: "serviceDay",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Día de servicio" />
        ),
        cell: ({ row }) => {
            const serviceDays = {
                1: "Lunes",
                2: "Martes",
                3: "Miércoles",
                4: "Jueves",
                5: "Viernes",
            }
            return (
                <div className="flex items-center">
                    <span>
                        {serviceDays[row.getValue("Día de servicio") as keyof typeof serviceDays]}
                    </span>
                </div>
            )
        },
        enableHiding: true,
    },
    {
        id: "actions",
        cell: () => <DataTableRowActions />,
    },
]


