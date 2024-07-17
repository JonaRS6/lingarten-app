import { ChevronLeft, PlusCircle, Upload } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { ZodSchema, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Customer as ICustomer } from "../models/Customer"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useParams } from "react-router-dom"
import supabase from "../utils/supabase"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"


const customerSchema: ZodSchema<ICustomer> = z.object({
    tel1: z.number(),
    tel2: z.union([z.number(), z.string(), z.null()]).optional(),
    active: z.boolean(),
    lastname: z.string(),
    name: z.string({
        description: "El nombre del cliente",
        required_error: "El nombre es requerido"
    }).min(3),
    email: z.string().email().optional(),
    printq: z.boolean(),
    position: z.number(),
    status: z.string(),
    street_no: z.string(),
    street_name: z.string(),
    colony: z.string(),
    servicePeriod: z.string(),
    serviceCost: z.number(),
    serviceType: z.string(),
    serviceDay: z.string()
});




const Customer = () => {

    const customerId = useParams<{ id: string }>().id

    const getCustomer = () => {
        return supabase
            .from("clients")
            .select("*")
            .eq("id", customerId)
            .single()
    }

    const query = useQuery({
        queryKey: ['customers', customerId], queryFn: async () => {
            return getCustomer().then((res) => res.data as ICustomer)
        }
    })

    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            tel1: 0,
            tel2: "",
            active: false,
            lastname: "",
            name: "",
            email: "",
            printq: false,
            position: 0,
            status: "pagado",
            street_no: "",
            street_name: "",
            colony: "",
            servicePeriod: "",
            serviceCost: 0,
            serviceType: "",
            serviceDay: ""
        },
    })

    useEffect(() => {
        if (query.data) {
            console.log(query.data);

            form.reset(query.data)
        }
    }, [query.data])


    function onSubmit(values: z.infer<typeof customerSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <>
            <div className=" grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    {/** Si el cliente ya existe, mostrar el nombre del cliente */}
                    {query.isSuccess && query.data && (
                        <h1 className="text-lg font-semibold">{query.data.name} {query.data.lastname}</h1>
                    )}
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                        In stock
                    </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px]">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Datos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-6 gap-4">
                                    <Form {...form}>
                                        <h3 className="col-span-6 font-semibold">
                                            Información personal
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Nombre</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Apellido</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel >Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tel1"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Teléfono</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="tel" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tel2"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Teléfono 2</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <hr className="col-span-6 my-4" />
                                        <h3 className="col-span-6 font-semibold">
                                            Dirección
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="street_name"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel >Calle</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="street_no"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Número</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="colony"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel >Colonia</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <hr className="col-span-6 my-4" />
                                        <h3 className="col-span-6 font-semibold">
                                            Servicio
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="serviceDay"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Día de servicio</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="1">Lunes</SelectItem>
                                                            <SelectItem value="2">Martes</SelectItem>
                                                            <SelectItem value="3">Miércoles</SelectItem>
                                                            <SelectItem value="4">Jueves</SelectItem>
                                                            <SelectItem value="5">Viernes</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="serviceCost"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel >Costo de servicio</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="servicePeriod"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Cobro</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="mensual" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Mensual
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="bimestral" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Bimestral
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="anual" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">Anual</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/** Si  el Servicio es bimestral elegir serviceType (par o impar)*/}
                                        {form.watch('servicePeriod') === "bimestral" && (
                                            <FormField
                                                control={form.control}
                                                name="serviceType"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3 col-span-3">
                                                        <FormLabel>Meses de cobro</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="impar" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Mes impar (Enero, Marzo, Mayo, Julio, Septiembre, Noviembre)
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="par" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Mes par (Febrero, Abril, Junio, Agosto, Octubre, Diciembre)
                                                                    </FormLabel>
                                                                </FormItem>

                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                        }
                                        {/* Sí es anual, elegir el mes de servicio */}
                                        {form.watch('servicePeriod') === "anual" && (
                                            <FormField
                                                control={form.control}
                                                name="serviceType"
                                                render={({ field }) => (
                                                    <FormItem className="col-span-1">
                                                        <FormLabel >Mes de cobro</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="enero">Enero</SelectItem>
                                                                <SelectItem value="febrero">Febrero</SelectItem>
                                                                <SelectItem value="marzo">Marzo</SelectItem>
                                                                <SelectItem value="abril">Abril</SelectItem>
                                                                <SelectItem value="mayo">Mayo</SelectItem>
                                                                <SelectItem value="junio">Junio</SelectItem>
                                                                <SelectItem value="julio">Julio</SelectItem>
                                                                <SelectItem value="agosto">Agosto</SelectItem>
                                                                <SelectItem value="septiembre">Septiembre</SelectItem>
                                                                <SelectItem value="octubre">Octubre</SelectItem>
                                                                <SelectItem value="noviembre">Noviembre</SelectItem>
                                                                <SelectItem value="diciembre">Diciembre</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                        }

                                        <div className="col-span-6" />
                                        <Button
                                            type="submit"
                                            onClick={form.handleSubmit(onSubmit)}
                                            className="col-span-1 flex gap-1"
                                        >
                                            <Upload className="h-3.5 w-3.5" />
                                            Guardar
                                        </Button>

                                    </Form>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Stock</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">SKU</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="w-[100px]">Size</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-001
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-1" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-1"
                                                    type="number"
                                                    defaultValue="100"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-1" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-1"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-002
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-2" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-2"
                                                    type="number"
                                                    defaultValue="143"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-2" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-2"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="m"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-003
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="number"
                                                    defaultValue="32"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="price-3"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Variant
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Product Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="category"
                                                aria-label="Select category"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="accessories">
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="subcategory">
                                            Subcategory (optional)
                                        </Label>
                                        <Select>
                                            <SelectTrigger
                                                id="subcategory"
                                                aria-label="Select subcategory"
                                            >
                                                <SelectValue placeholder="Select subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                                <SelectItem value="sweatshirts">
                                                    Sweatshirts
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Customer