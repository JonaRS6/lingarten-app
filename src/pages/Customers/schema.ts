import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  id: z.string(),
  tel1: z.number(),
  tel2: z.any(),
  active: z.boolean(),
  lastname: z.string(),
  name: z.string(),
  email: z.string().optional(),
  registedAt: z.number().optional(),
  cancelDate: z.number().optional(),
  printq: z.boolean(),
  position: z.number(),
  status: z.enum(['pagado', 'pendiente', 'atrasado']),
  firestore_id: z.string().optional(),
  street_no: z.string(),
  street_name: z.string(),
  colony: z.string(),
  servicePeriod: z.string(),
  serviceCost: z.number(),
  serviceType: z.string(),
  serviceDay: z.string(),
})

export type Customer = z.infer<typeof customerSchema>