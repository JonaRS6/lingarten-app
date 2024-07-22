import {
    Home,
    Package2,
    PanelLeft,
    Receipt,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { NavLink, UIMatch, useMatches } from "react-router-dom"

import { useEffect, useRef, useState } from "react"
import { searchCustomersAndReceipts } from "@/services/api"
import { Separator } from "@/components/ui/separator"
import { useDebounce } from "@/hooks/useDebounce"
import { SearchResult } from "@/models/SearchResult"

export function Layout() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                    <NavLink
                        to="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Lingarten</span>
                    </NavLink>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink
                                    to="/"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink
                                    to="/customers"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Users2 className="h-5 w-5" />
                                    <span className="sr-only">Clientes</span>
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right">Clientes</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink
                                    to="/payments"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="sr-only">Pagos</span>
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right">Pagos</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink
                                    to="/settings"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Configuración</span>
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right">Configuración</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <NavLink
                                    to="/"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Lingarten</span>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className="flex items-center gap-4 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/customers"
                                    className="flex items-center gap-4 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Clientes
                                </NavLink>
                                <NavLink
                                    to="/payments"
                                    className="flex items-center gap-4 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Pagos
                                </NavLink>
                                <NavLink
                                    to="/settings"
                                    className="flex items-center gap-4 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground"
                                >
                                    <Settings className="h-5 w-5" />
                                    Configuración
                                </NavLink>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumbs />
                    <SearchBar />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >

                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                </main>
            </div>
        </div>
    )
}

/**
 * Muestra la ruta actual en la que se encuentra el usuario
 */
export const Breadcrumbs = () => {
    let matches = useMatches();
    let crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter((match: UIMatch<unknown, any>) => Boolean(match.handle?.crumb))
        // now map them into an array of elements, passing the loader
        // data to each one
        .map((match: UIMatch<unknown, any>) => match.handle.crumb(match.id, match.params));
    return (
        <Breadcrumb className="select-none">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Home className="h-4 w-4" />
                </BreadcrumbItem>
                {
                    crumbs.map((crumb, index) => (
                        <>
                            <BreadcrumbSeparator key={"separator" + index} />
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{crumb}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>

                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

/**
 * Barra de búsqueda para clientes y recibos
 */
export const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const handleValueChange = (value: string) => {
        setSearch(value)
        setOpen(!!value)
    }
    const [customers, setCustomers] = useState<SearchResult[]>([])
    const [receipts, setReceipts] = useState<SearchResult[]>([])
    const debuncedSearch = useDebounce(search, 500)
    useEffect(() => {
        setIsLoading(true)
        searchCustomersAndReceipts(debuncedSearch).then(data => {
            setCustomers(data.filter(result => result.type === 'customer'))
            setReceipts(data.filter(result => result.type === 'receipt'))
            setIsLoading(false)
        })
    }, [debuncedSearch])


    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [ref])
    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => handleValueChange(e.target.value)}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
            {
                open && (
                    <div ref={ref} className="absolute top-11 left-0 w-full bg-background border rounded-lg shadow-lg p-1 text-sm text-muted-foreground">
                        {
                            isLoading && (
                                <div className="flex py-1 px-2 rounded">
                                    <p className="text-center w-full text-foreground">Buscando...</p>
                                </div>
                            )
                        }
                        {
                            customers.length > 0 && (
                                <div className="flex py-1 px-2 rounded font-bold text-xs">
                                    <p>Clientes</p> <Users2 className="h-4 w-4 ml-auto" />
                                </div>
                            )
                        }
                        {
                            customers.map(result => (
                                <div key={result.id} className="flex py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                    <p>{result.name}</p>
                                </div>
                            ))
                        }
                        {
                            receipts.length > 0 && customers.length > 0 && (<Separator className="my-1" />)
                        }
                        {
                            receipts.length > 0 && (
                                <div className="flex py-1 px-2 rounded font-bold text-xs">
                                    <p>Recibos</p> <Receipt className="h-4 w-4 ml-auto" />
                                </div>
                            )
                        }
                        {
                            receipts.map(result => (
                                <div key={result.id} className="flex py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                    <p>{result.name}</p>
                                </div>
                            ))
                        }
                        {
                            !isLoading &&
                            customers.length === 0 && receipts.length === 0 && (
                                <div className="flex py-1 px-2 rounded">
                                    <p className="text-center w-full text-foreground">Sin resultados</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

