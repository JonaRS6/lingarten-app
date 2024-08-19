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
import { CustomerForm } from "./customer-form"

const customerFormSchema = z.object({
    tel1: z.number().min(1000000000, { message: "Debe tener al menos 10 dígitos." }),
    tel2: z.number().optional(),
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

export function Customer() {
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerFormSchema),
        defaultValues,
        mode: "onChange",
    })

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
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-5xl">
                    <CustomerForm />
                </div>
            </div>
        </div>
    )
}