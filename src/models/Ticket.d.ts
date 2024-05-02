export interface Ticket {
    id: string
    cost: number
    generated: number
    type: string
    paidDate: number
    paid: boolean
    firestore_id: string
    clientId: string
  }
  