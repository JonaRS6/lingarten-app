import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { Customer } from "../models/Customer"
import { getCustomers } from "../queries/getCustomers"

const Dashboard = () => {

    const currentDay = new Date().getDay()

    const { data: customers, isLoading, isError, isSuccess } = useQuery<Customer>(getCustomers({
        filters: [
            {field: 'status', value: ['pendiente', 'atrasado']},
            {field: 'serviceDay', value: [currentDay.toString()]}

        ],
        page: 0,
        pageSize: 10,
        orderBy: 'position',
        order: 'asc'
    }))

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Subscriptions
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card
                    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Clientes pendientes</CardTitle>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link to="/customers">
                                Ver todos
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isSuccess && customers && customers?.length > 0 && <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="hidden xl:table-column">
                                        Teléfono
                                    </TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    customers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="font-medium">{customer.name} {customer.lastname}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {`${customer.street_name} ${customer.street_no}, ${customer.colony}`}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                {customer.phone}
                                            </TableCell>
                                            <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        }
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Pagos recientes</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="flex items-center gap-4">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Olivia Martin
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    olivia.martin@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$1,999.00</div>
                        </div>
                        <div className="flex items-center gap-4">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Jackson Lee
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    jackson.lee@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$39.00</div>
                        </div>
                        <div className="flex items-center gap-4">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Isabella Nguyen
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    isabella.nguyen@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$299.00</div>
                        </div>
                        <div className="flex items-center gap-4">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    William Kim
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    will@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$99.00</div>
                        </div>
                        <div className="flex items-center gap-4">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Sofia Davis
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    sofia.davis@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$39.00</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ >
    )
}

export default Dashboard