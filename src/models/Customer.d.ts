export interface Customer {
  id?: string
  tel1: number
  tel2?: any
  active: boolean
  lastname: string
  name: string
  email?: string
  registedAt?: number
  cancelDate?: number
  printq: boolean
  position: number
  status: string
  firestore_id?: string
  street_no: string
  street_name: string
  colony: string
  servicePeriod: string
  serviceCost: number
  serviceType: string
  serviceDay: string
}