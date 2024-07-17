import React from 'react';
import CustomerForm from './CustomerForm';
import TicketsList from './TicketsList';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const CustomerDetail: React.FC = () => {



    return (
        <div className='p-4 divide-y-2 space-y-4'>
            <Link to={'/'}  className='flex items-center hover:bg-gray-100 rounded w-fit px-2 cursor-pointer'>

                <HiChevronLeft className='text-2xl' />
                <span className='text-xs'> Volver a tabla de clientes</span>
            </Link >

            {/* Form or Data Info Section */}
            <section>
                <CustomerForm />
            </section>

            {/* List of Cards Section */}
            <section>
                <TicketsList />
            </section>
        </div>
    );
};

export default CustomerDetail;
