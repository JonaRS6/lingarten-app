import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Column, useReactTable } from "@tanstack/react-table"

import supabase from '@/utils/supabase'
import { useEffect, useState } from "react";
import { Customer } from "@/models/Customer";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { CheckIcon, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTable } from "./data-table"
import { columns } from "./columns"

type Option = {
    value: string
    label: string
}

const statuses: Option[] = [
    { value: "pagado", label: "Pagado" },
    { value: "pendiente", label: "Pendiente" },
    { value: "cancelado", label: "Cancelado" },
    { value: "atrasado", label: "Atrasado" },
]

export function Customers() {

    const [customers, setCustomers] = useState<Partial<Customer>[] >([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);


    function getToday() {
        // Obtener el día de la semana
        let today = new Date().getDay();

        // si es sábado o domingo, se cambia a lunes
        if (today === 0 || today === 6) {
            today === 0 ? today = today + 2 : today = 1;
        }
        return today.toString();
    }
    // Filters
    const [days, setDays] = useState<string[]>([getToday()]);

    // una función que recibe un evento onChange de un checkbox y un día en string
    function selectDay(e: React.ChangeEvent, day: string) {
        if (day === 'all') {
            if ((e.target as HTMLInputElement).checked) {
                setDays(['1', '2', '3', '4', '5']);
            } else {
                setDays([]);
            }
            return;
        }
        if (days.includes(day)) {
            setDays(days.filter((d) => d !== day));
        } else {
            setDays([...days, day]);
        }
    }

    const [statusFilters, setStatusFilters] = useState<string[]>(['pagado', 'pendiente', 'cancelado', 'atrasado']);

    function selectStatus(e: React.ChangeEvent, status: string) {
        if (status === 'all') {
            if ((e.target as HTMLInputElement).checked) {
                setStatusFilters(['pagado', 'pendiente', 'cancelado', 'atrasado']);
            } else {
                setStatusFilters([]);
            }
            return;
        }
        if (statusFilters.includes(status)) {
            setStatusFilters(statusFilters.filter((s) => s !== status));
        } else {
            setStatusFilters([...statusFilters, status]);
        }
    }

    // Pagination

    // La paginación funciona con un rango de 10 clientes, se tien que modificar los rangos para obtener más clientes

    const [range, setRange] = useState<[number, number]>([0, 9]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
        setRange([(page - 1) * 10, page * 10 - 1])
    }

    // Search
    const [searchValue, setSearchValue] = useState<string>('');



    useEffect(() => {
        setLoading(true);
        getCustomers();
    }, [days, statusFilters, range]);

    useEffect(() => {
        // Si cambian los filtros, se regresa a la primera página
        setRange([0, 9]);
        setCurrentPage(1);
    }, [days, statusFilters, searchValue]);

    async function getCustomers() {
        let query = supabase.from("clients")
            .select('id, name, lastname, street_name, street_no, colony, status, tel1, registedAt, cancelDate, serviceDay', { count: 'exact' })

        const { data, count } = await query
            .order('position', { ascending: true })
        setLoading(false);
        setCustomers(data);
        setCount(count || 0);
        setTotalPages(Math.ceil((count || 0) / 10));
    }

    const [statusOpen, setStatusOpen] = useState(false)


    return (
        <>
            <CardHeader className="px-7">
                <CardTitle>Clientes</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={customers}
                    columns={columns}
                />
            </CardContent>
        </>
    )
}
