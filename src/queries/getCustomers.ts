import { Customer } from "../models/Customer"
import { Filter } from "../models/Filter"
import supabase from "../utils/supabase"

interface CustomerListQuery {
    filters: Filter<Customer>[]
    page: number
    pageSize: number
    orderBy: keyof Customer
    order: 'asc' | 'desc'
}
export function getCustomers(opts: CustomerListQuery) {
    let query = supabase.from("clients")
        .select('*', { count: 'exact' })

    // Ensure that opts.filters is defined and has length before proceeding
    if (opts.filters && opts.filters.length > 0) {
        opts.filters.forEach(filter => {
            if (filter && Array.isArray(filter.value)) {
                // Use 'in' for arrays of values, ensure filter.field is defined
                query = query.in(filter.field as string, filter.value);
            } else if (filter) {
                // Use 'eq' for single value, ensure filter.field and filter.value are defined
                query = query.eq(filter.field as string, filter.value);
            }
        });
    }

    query = query
        .order(opts.orderBy, { ascending: opts.order === 'asc' })
        .range(opts.page * opts.pageSize, (opts.page + 1) * opts.pageSize - 1)

    return query


}

export function getCustomersWithTotalUnpaid(id: string) {
    return supabase.from("clients")
        .select('*')
}