import React from 'react';
import { Ticket } from '../models/Ticket';
import { Badge } from 'flowbite-react';
import supabase from '../utils/supabase';
import { useParams } from 'react-router-dom';
import { HiTrash, HiDocumentText } from 'react-icons/hi';


const TicketsList: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [tickets, setTickets] = React.useState<Ticket[]>([]);


    React.useEffect(() => {
        getTicketsByCustomerId();
    }, []);

    async function getTicketsByCustomerId() {
        const { data, error } = await supabase.from('tickets').select().eq('clientId', id).order('generated', { ascending: false });
        if (error) {
            console.error(error);
            return;
        }
        setTickets(data);
    }
    return (
        <div className='w-full flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-4'>
                <div className='bg-teal-600 rounded size-12 flex'>

                    <HiDocumentText className='inline-block text-3xl text-white m-auto' />
                </div>
                <h1 className='font-bold'>Notas</h1>
            </div>
            {/* Add your list of cards components here */}
            <div className='grid grid-cols-3 gap-4'>

                {tickets.map((ticket) => (
                    <TicketCard {...ticket} key={ticket.id} />
                ))}
            </div>
        </div>
    );
};

export default TicketsList;


const TicketCard: React.FC<Ticket> = (ticket) => {
    return (
        <div className='border rounded-md p-4 flex flex-col gap-2 shadow-md'>
            <span className='text-sm'>{new Date(ticket.generated).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {/* Si el ticket está pagado mostrar 'Pagado'. Si no evaluar si tiene más de un mes de atraso, para mostrar 'pendiente' o 'atrasado' */}
            <Badge
                color={ticket.paid ? 'success' : new Date(ticket.generated).getTime() < new Date().getTime() - 30 * 24 * 60 * 60 * 1000 ? 'failure' : 'warning'}
                className='w-fit'
            >{ticket.paid ? 'Pagado' : new Date(ticket.generated).getTime() < new Date().getTime() - 30 * 24 * 60 * 60 * 1000 ? 'Atrasado' : 'Pendiente'}</Badge>
            {/* Mostrar el importe del ticket formateado como moneda MXN*/}
            <span className='font-bold text-xl text-gray-800'>{Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(ticket.cost)}</span>
            <p>{ticket.type}</p>
            <hr />
            {/** Botones para eliminar y pagar el recibo */}
            <div className='flex justify-end gap-4'>
                <button className='hover:text-red-600 hover:border-red-600 border px-4 py-0.5 rounded-md flex items-center'> <HiTrash />Eliminar</button>
                {!ticket.paid && <button className='bg-teal-600 text-white px-4 py-0.5 rounded-md'>Pagar</button>}
            </div>
        </div>
    )

}