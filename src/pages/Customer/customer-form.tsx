import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { usePhoneInput } from "@/hooks/usePhoneInput"
import { Switch } from "@/components/ui/switch"

const customerFormSchema = z.object({
    tel1: z.string().min(10, { message: "Debe tener al menos 10 dígitos." }),
    tel2: z.string().min(10, { message: "Debe tener al menos 10 dígitos." }).optional(),
    active: z.boolean(),
    lastname: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    email: z.string().email({ message: "Debe ser un email válido." }).optional(),
    printq: z.boolean(),
    position: z.number().min(1, { message: "Debe ser un número positivo." }),
    status: z.enum(['pagado', 'pendiente', 'atrasado']),
    street_no: z.string().min(1, { message: "Este campo es obligatorio." }),
    street_name: z.string().min(1, { message: "Este campo es obligatorio." }),
    colony: z.string().min(1, { message: "Este campo es obligatorio." }),
    servicePeriod: z.string().min(1, { message: "Este campo es obligatorio." }),
    serviceCost: z.number().min(0, { message: "Debe ser un número positivo." }),
    serviceType: z.string().min(1, { message: "Este campo es obligatorio." }),
    serviceDay: z.string().min(1, { message: "Este campo es obligatorio." })
})

type CustomerFormValues = z.infer<typeof customerFormSchema>

const defaultValues: Partial<CustomerFormValues> = {
    active: true,
    printq: false,
    status: 'pendiente',
}

export function CustomerForm() {
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { formattedPhoneNumber, rawPhoneNumber, handleChange: handlePhoneChange } = usePhoneInput()

    const { formattedPhoneNumber: formatPhoneNumber2, rawPhoneNumber: rawPhoneNumber2, handleChange: handlePhoneChange2 } = usePhoneInput()

    function onSubmit(data: CustomerFormValues) {
        toast({
            title: "Se han enviado los siguientes valores:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
                    <div className="grid grid-cols-subgrid col-span-full gap-y-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-subgrid col-span-full gap-y-4">

                        <FormField
                            control={form.control}
                            name="tel1"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Teléfono 1</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handlePhoneChange(e);
                                            }}
                                            value={field.value}
                                            maxLength={12} />
                                    </FormControl>
                                    <pre>
                                        {field.value}
                                    </pre>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tel2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono 2</FormLabel>
                                    <FormControl>
                                        <Input
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handlePhoneChange2(e);
                                            }}
                                            value={formatPhoneNumber2}
                                            maxLength={12}
                                            type="text"
                                        />
                                    </FormControl>
                                    <pre>
                                        {field.value}
                                    </pre>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="grid grid-cols-subgrid col-span-full gap-y-4">
                        <FormField
                            control={form.control}
                            name="street_name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Nombre de la Calle</FormLabel>
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
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Número de Calle</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="colony"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Colonia</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-subgrid col-span-full gap-y-4">

                        <FormField
                            control={form.control}
                            name="serviceDay"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Día del Servicio</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="serviceCost"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Costo del Servicio</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="servicePeriod"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Período del Servicio</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Servicio</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }: { field: any }) => (
                            <FormItem className="flex gap-4 items-center space-y-0">
                                <FormLabel className="m-0">Activo</FormLabel>
                                <FormControl className="flex m-0">
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="printq"
                        render={({ field }: { field: any }) => (
                            <FormItem className="flex gap-4 items-center space-y-0">
                                <FormLabel>Añadir a cola de impresión</FormLabel>
                                <FormControl>
                                    <Checkbox {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Actualizar Cliente</Button>
                </form>
            </Form>
        </div>
    )
}