import { CheckCircle, ClockIcon, Cross } from "lucide-react"

  
  export const statuses = [
    {
      value: "pagado",
      label: "Pagado",
      icon: CheckCircle,
    },
    {
      value: "pendiente",
      label: "Pendiente",
      icon: ClockIcon,
    },
    {
      value: "atrasado",
      label: "Atrasado",
      icon: ClockIcon,
    },
    {
      value: "cancelado",
      label: "Cancelado",
      icon: Cross,
    },
  ]
  
  export const serviceDays = [
    {
      label: "Lunes",
      value: "1",
    },
    {
      label: "Martes",
      value: "2",
    },
    {
      label: "Miércoles",
      value: "3",
    },
    {
      label: "Jueves",
      value: "4",
    },
    {
      label: "Viernes",
      value: "5",
    }
  ]