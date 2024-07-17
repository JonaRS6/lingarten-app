import { Badge, Checkbox, Dropdown, Pagination, Table } from "flowbite-react";

import supabase from '../utils/supabase'
import { useEffect, useState } from "react";
import { Customer } from "../models/Customer";

import { Label, TextInput } from "flowbite-react";
import { HiSearch, HiDocumentSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

export function CustomersTable() {

    const [customers, setCustomers] = useState<Partial<Customer>[] | null>(null);
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
            .select('id, name, lastname, street_name, street_no, colony, status', { count: 'exact' })

        if (!searchValue) {
            query = query.in('serviceDay', days)
                .in('status', statusFilters)
                .order('position', { ascending: true })
                .range(range[0], range[1]);
        }
        else {
            query = query.textSearch('name_lastname', `${searchValue}`)
                .order('position', { ascending: true })
                .range(range[0], range[1]);
        }

        const { data, count } = await query

            .in('serviceDay', days)
            .in('status', statusFilters)
            .order('position', { ascending: true })
            .range(range[0], range[1]);
        setLoading(false);
        setCustomers(data);
        setCount(count || 0);
        setTotalPages(Math.ceil((count || 0) / 10));
    }

    return (
        <div className=" h-full max-h-[780px] my-auto p-4">
            <div className=" w-full flex gap-4 mb-4" >
                <Dropdown label="Días de servicio" dismissOnClick={false} placement="bottom-start" >
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="all" checked={
                            days.length === 5
                        } onChange={(e) => selectDay(e, 'all')} />
                        <Label htmlFor="lunes">Todos</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="lunes" checked={
                            days.includes('1')
                        } onChange={(e) => selectDay(e, '1')} />
                        <Label htmlFor="lunes">Lunes</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="martes" checked={
                            days.includes('2')
                        } onChange={(e) => selectDay(e, '2')} />
                        <Label htmlFor="martes">Martes</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="miercoles" checked={
                            days.includes('3')
                        } onChange={(e) => selectDay(e, '3')} />
                        <Label htmlFor="miercoles">Miércoles</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="jueves" checked={
                            days.includes('4')
                        } onChange={(e) => selectDay(e, '4')} />
                        <Label htmlFor="jueves">Jueves</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="viernes" checked={
                            days.includes('5')
                        } onChange={(e) => selectDay(e, '5')} />
                        <Label htmlFor="viernes">Viernes</Label>
                    </Dropdown.Item>
                </Dropdown>
                <Dropdown label="Status" dismissOnClick={false} placement="bottom-start" >
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="all" checked={
                            statusFilters.length === 4
                        } onChange={(e) => selectStatus(e, 'all')} />
                        <Label htmlFor="all">Todos</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="pagado" checked={
                            statusFilters.includes('pagado')
                        } onChange={(e) => selectStatus(e, 'pagado')} />
                        <Label htmlFor="pagado">Pagado</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="pendiente" checked={
                            statusFilters.includes('pendiente')
                        } onChange={(e) => selectStatus(e, 'pendiente')} />
                        <Label htmlFor="pendiente">Pendiente</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="cancelado" checked={
                            statusFilters.includes('cancelado')
                        } onChange={(e) => selectStatus(e, 'cancelado')} />
                        <Label htmlFor="cancelado">Cancelado</Label>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 hover:outline-none">
                        <Checkbox id="atrasado" checked={
                            statusFilters.includes('atrasado')
                        } onChange={(e) => selectStatus(e, 'atrasado')} />
                        <Label htmlFor="atrasado">Atrasado</Label>
                    </Dropdown.Item>
                </Dropdown>
                <TextInput id="email4" type="email" icon={HiSearch} placeholder="Buscar" required className="ml-auto basis-1/3" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <Table className="">
                <Table.Head>
                    <Table.HeadCell className="w-1/4">Cliente</Table.HeadCell>
                    <Table.HeadCell className="w-1/2">Dirección</Table.HeadCell>
                    <Table.HeadCell className="w-14">Estado</Table.HeadCell>
                    <Table.HeadCell className="ml-auto">
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {!loading && customers?.map((customer) => (
                        <Table.Row key={customer.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {`${customer.name} ${customer.lastname}`}
                            </Table.Cell>
                            <Table.Cell>
                                {`${customer.street_name} #${customer.street_no}, ${customer.colony}`}
                            </Table.Cell>
                            <Table.Cell>
                                <Badge color={
                                    customer.status === 'pagado' ? 'success' :
                                        customer.status === 'pendiente' ? 'warning' :
                                            customer.status === 'atrasado' ? 'failure' :
                                                'blue'
                                } className="max-w-fit text-center capitalize flex border border-inherit">
                                    {customer.status}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`customers/${customer.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    view
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {/* Renderiza filas vacías, escribe "empty" con texto transparente */}
                    {customers &&
                        customers.length > 0 && customers.length < 10 && Array.from({ length: 10 - customers.length }).map((_, i) => (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={4} className="text-center">
                                    <Badge color="blue" className="max-w-fit text-center capitalize flex border border-inherit invisible">
                                        empty
                                    </Badge>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    {loading && !customers && <Table.Row>
                        <Table.Cell colSpan={4} className="text-center">Cargando...</Table.Cell>
                    </Table.Row>}
                    {!loading && !customers?.length && <Table.Row>
                        <Table.Cell colSpan={4} className="text-center">
                            No hay clientes que coincidan con los filtros
                            <HiDocumentSearch className="mx-auto text-4xl text-gray-400 my-2" />
                        </Table.Cell>
                    </Table.Row>}
                </Table.Body>
            </Table>
            <div className="w-full flex py-2 items-center">
                {count ? <span className="text-xs text-gray-600">
                    Mostrando
                    <span className="text-gray-900 font-bold mx-1">
                        {range[0] + 1}
                    </span>a
                    <span className="text-gray-900 font-bold mx-1">
                        {range[1] + 1 > count ? count : range[1] + 1}
                    </span> de
                    <span className="text-gray-900 font-bold mx-1">
                        {count}
                    </span> clientes
                </span> : null}
                <Pagination
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    className="ml-auto"
                    previousLabel="Anterior"
                    nextLabel="Siguiente"

                    showIcons />
            </div>
        </div>
    )
}
