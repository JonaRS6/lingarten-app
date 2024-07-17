import { ListFilter, MoreHorizontal, PlusCircle, Printer } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

import { Customer } from "../models/Customer"
import { Link } from "react-router-dom"
import { getCustomers } from "../queries/getCustomers"
import { useState } from "react"
import { Filter } from "../models/Filter"

const Customers = () => {

  const currentDay = new Date().getDay()

  const [filters, setFilters] = useState<Filter<Customer>[]>([
    { field: 'serviceDay', value: [currentDay.toString()] },
    { field: 'status', value: ['pagado', 'pendiente', 'atrasado'] },
  ])



  // Queries
  const query = useQuery<Customer>(getCustomers({
    filters,
    page: 0,
    pageSize: 1000,
    orderBy: 'position',
    order: 'asc'
  }))
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList className="hidden">
          <TabsTrigger value="all" >All</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtrar
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="grid grid-cols-2 gap-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Días de servicio</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'serviceDay')?.value.includes('1') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'serviceDay' ? { ...filter, value: filter.value.includes('1') ? filter.value.filter((value: string) => value !== '1') : [...filter.value, '1'] } : filter))

                  } textValue="1">
                    Lunes
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'serviceDay')?.value.includes('2') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'serviceDay' ? { ...filter, value: filter.value.includes('2') ? filter.value.filter((value: string) => value !== '2') : [...filter.value, '2'] } : filter))

                  } textValue="2">
                    Martes
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'serviceDay')?.value.includes('3') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'serviceDay' ? { ...filter, value: filter.value.includes('3') ? filter.value.filter((value: string) => value !== '3') : [...filter.value, '3'] } : filter))

                  } textValue="3">
                    Miércoles
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'serviceDay')?.value.includes('4') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'serviceDay' ? { ...filter, value: filter.value.includes('4') ? filter.value.filter((value: string) => value !== '4') : [...filter.value, '4'] } : filter))

                  } textValue="4">
                    Jueves
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'serviceDay')?.value.includes('5') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'serviceDay' ? { ...filter, value: filter.value.includes('5') ? filter.value.filter((value: string) => value !== '5') : [...filter.value, '5'] } : filter))

                  } textValue="5">
                    Viernes
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Estatus</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'status')?.value.includes('pagado') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'status' ? { ...filter, value: filter.value.includes('pagado') ? filter.value.filter((value: string) => value !== 'pagado') : [...filter.value, 'pagado'] } : filter))

                  } textValue="pagado">
                    <div className="rounded-full mr-2 size-2 bg-green-500"/>
                    Pagado
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'status')?.value.includes('pendiente') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'status' ? { ...filter, value: filter.value.includes('pendiente') ? filter.value.filter((value: string) => value !== 'pendiente') : [...filter.value, 'pendiente'] } : filter))

                  } textValue="pendiente">
                    <div className="rounded-full mr-2 size-2 bg-yellow-500"/>
                    Pendiente
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={
                    filters.find(filter => filter?.field === 'status')?.value.includes('atrasado') ?? false
                   } onSelect={() =>
                    setFilters(filters => filters.map(filter => filter?.field === 'status' ? { ...filter, value: filter.value.includes('atrasado') ? filter.value.filter((value: string) => value !== 'atrasado') : [...filter.value, 'atrasado'] } : filter))

                  } textValue="atrasado">
                    <div className="rounded-full mr-2 size-2 bg-red-500"/>
                    Atrasado
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <Printer className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Imprimir
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Rutas</DropdownMenuLabel>
              <DropdownMenuItem>Lunes</DropdownMenuItem>
              <DropdownMenuItem>Martes</DropdownMenuItem>
              <DropdownMenuItem>Miércoles</DropdownMenuItem>
              <DropdownMenuItem>Jueves</DropdownMenuItem>
              <DropdownMenuItem>Viernes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Añadir cliente
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Tabla de clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Estatus
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  query.data?.map((customer) => (
                    <TableRow key={customer.id} className="text-muted-foreground">
                      <TableCell className="font-medium">
                        {customer.name} {customer.lastname}
                      </TableCell>
                      <TableCell>
                        {customer.street_name} {customer.street_no}, {customer.colony}
                      </TableCell>
                      <TableCell>
                        {customer.tel1 ? customer.tel1 : "---"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={`capitalize cursor-pointer ${customer.status === "pagado" ? "bg-green-200 hover:bg-green-300 border-green-900 text-green-900" :
                          customer.status === "pendiente" ? "bg-yellow-200 hover:bg-yellow-300 border-yellow-900 text-yellow-900" : "bg-red-200 hover:bg-red-300 border-red-900 text-red-900"}`}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to={`/customers/${customer.id}`}>
                              <DropdownMenuItem>Consultar</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>Imprimir nota</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Customers