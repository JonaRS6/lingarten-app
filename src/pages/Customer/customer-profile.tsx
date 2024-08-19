import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    Printer,
    Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { Customer } from "@/models/Customer"
import { useEffect, useState } from "react"
import supabase from "@/utils/supabase"

const SERVICE_DAYS: Record<string, string> = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
}

type CustomerProfileProps = {
    customerId: string
}
export default function CustomerProfile(
    { customerId }: CustomerProfileProps
) {
    const [customer, setCustomer] = useState<Customer | null>(null)
    // Fetch customer data
    const getCustomer = () => {
        return supabase
            .from("clients")
            .select("*")
            .eq("id", customerId)
            .single()
    }
    useEffect(() => {
        getCustomer().then(({ data, error }) => {
            if (error) {
                console.error("error", error)
                return
            }
            setCustomer(data as Customer)
        })
    }, [customerId])
    if (!customer) {
        return "asdasd"
    }
    return (
        <Card className="overflow-hidden md:w-96">
            <CardHeader className="flex flex-col items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        {customer.name} {customer.lastname}
                    </CardTitle>
                    <CardDescription>
                        {customer.street_name} #{customer.street_no}, {customer.colony}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Viaje adicional
                        </span>
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                        <Printer className="h-3.5 w-3.5" />
                        <span className="sr-only">
                            Print
                        </span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">


                <div className="grid gap-3">
                    <div className="font-semibold">Datos de servicio</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Día de recolección</dt>
                            <dd>
                                {SERVICE_DAYS[customer.serviceDay]}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                                Costo de servicio
                            </dt>
                            <dd>
                                {Intl.NumberFormat("es-MX", {
                                    style: "currency",
                                    currency: "MXN",
                                }).format(customer.serviceCost)}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Frecuencia de cobro</dt>
                            <dd className="capitalize">
                                {customer.serviceType} {customer.servicePeriod !== "mensual" && customer.servicePeriod !== "bimestral" && `| ${customer.servicePeriod}`}
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Información de contacto</div>
                    <dl className="grid gap-3">

                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Teléfono</dt>
                            <dd>
                                <a href="tel:">
                                    {customer.tel1}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Teléfono adicional</dt>
                            <dd>
                                <a href="tel:">
                                    {customer.tel2 ? customer.tel2 : "---"}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">
                                    {customer.email ? customer.email : "---"}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Registros</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Fecha de registro</dt>
                            <dd>
                            <time dateTime={customer.registedAt?.toString() || ""}>
                                {new Date(customer.registedAt || "").toLocaleDateString("es-MX", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </time>
                            </dd>
                        </div>
                        {
                            customer.cancelDate && !customer.active && (
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Fecha de cancelación</dt>
                                    <dd>
                                        <time dateTime={customer.cancelDate.toString()}>
                                            {new Date(customer.cancelDate).toLocaleDateString("es-MX", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </time>
                                    </dd>
                                </div>
                            )
                        }
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Actualizado <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                        <PaginationItem>
                            <Button size="icon" variant="outline" className="h-6 w-6">
                                <ChevronLeft className="h-3.5 w-3.5" />
                                <span className="sr-only">Previous Order</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button size="icon" variant="outline" className="h-6 w-6">
                                <ChevronRight className="h-3.5 w-3.5" />
                                <span className="sr-only">Next Order</span>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    )
}
