"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "@/pages/Tickets/data-table-header"
import { DataTableRowActions } from "@/pages/Tickets/data-table-row-actions"
import { Ticket } from "@/models/Ticket"

export const columns: ColumnDef<Ticket>[] = [
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
        id: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Descripción" />
        ),
        accessorKey: "type",
        cell: ({ row }) => <div className="w-auto">
            <div className="font-medium">
                {row.getValue("description")}
            </div>
        </div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        id: "cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Importe" />
        ),
        accessorKey: "cost",
        cell: ({ row }) => <div className="w-auto">
            <div className="font-medium">
                {Intl.NumberFormat("es-MX", {
                    currency: "MXN",
                    style: "currency",
                }).format(row.getValue("cost"))}
            </div>
        </div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        id: "Estatus",
        accessorKey: "paid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estatus" />
        ),
        cell: ({ row }) => {


            return (
                <div className="flex w-[100px] items-center">
                    <Badge variant={"secondary"}>
                        <div className={`size-2 rounded-full mr-2 
                            ${row.getValue("Estatus") && "bg-green-500"}
                            ${!row.getValue("Estatus") && "bg-red-500"}
                            `} />
                        <span>
                            {row.getValue("Estatus") ? "Pagado" : "Pendiente"}
                        </span>
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
        id: "Fecha de emisión",
        accessorKey: "generated",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fecha de emisión" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("Fecha de emisión"))

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
        id: "actions",
        cell: () => <DataTableRowActions />,
    },
]


