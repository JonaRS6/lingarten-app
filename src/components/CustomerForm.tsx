import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { Customer } from '../models/Customer';
import { HiPrinter, HiUser } from "react-icons/hi";

// UI components for the form
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import supabase from '../utils/supabase';

const CustomerForm: React.FC = ({ }) => {

    /**
     * Si existe el parámetro customerId en la URL, se obtienen los datos completos del cliente
     * y se asignan al state customer. Además, el método de envío del formulario se cambia a PUT.
     * Si no existe, se asigna un objeto vacío al state customer y el método de envío del formulario
     * se mantiene en POST.
     */

    const { id } = useParams();

    const [customer, setCustomer] = useState<Customer>({
        id: '',
        tel1: 0,
        tel2: '',
        email: '',
        active: false,
        lastname: '',
        name: '',
        registedAt: 0,
        printq: false,
        position: 0,
        status: '',
        street_no: '',
        street_name: '',
        colony: '',
        servicePeriod: '',
        serviceCost: 0,
        serviceType: '',
        serviceDay: ''
    });

    useEffect(() => {
        if (id) {
            getCustomer();
        }
    }, [id]);

    async function getCustomer() {
        const { data, error } = await supabase.from('clients').select().eq('id', id);
        if (error) {
            console.error('Error fetching customer', error);
            return;
        }
        setCustomer(data[0]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //onSubmit(customer);
    };

    return (
        <div className='w-full flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-4'>
                <div className='bg-teal-600 rounded size-12 flex'>

                    <HiUser className='inline-block text-3xl text-white m-auto' />
                </div>
                <h1 className='font-bold'>Información del cliente</h1>
            </div>
            <Form method={id ? 'PUT' : 'POST'} onSubmit={handleSubmit} className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                <div className='col-span-4'>
                    <h3>Contacto</h3>
                    <hr />
                </div>
                <div className='col-span-2'>
                    <div className="mb-1 block">
                        <Label htmlFor="name" value="Nombre(s)" />
                    </div>
                    <TextInput id="name" type="text" placeholder="" value={customer['name']} required onChange={handleChange} />
                </div>
                <div className='col-span-2'>
                    <div className="mb-1 block">
                        <Label htmlFor="lastname" value="Apellidos" />
                    </div>
                    <TextInput id="lastname" type="text" placeholder="" value={customer['lastname']} required onChange={handleChange} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="tel1" value="Teléfono" />
                    </div>
                    <TextInput id="tel1" type="tel" placeholder="" value={customer['tel1']} required onChange={handleChange} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="tel2" value="Teléfono adicional" />
                    </div>
                    <TextInput id="tel2" type="tel" placeholder="" value={customer['tel2']} required onChange={handleChange} />
                </div>
                <div className='col-span-2'>
                    <div className="mb-1 block">
                        <Label htmlFor="email" value="Correo electrónico" />
                    </div>
                    <TextInput id="email" type="email" placeholder="" value={customer['email']} required onChange={handleChange} />
                </div>
                <div className='col-span-4'>
                    <h3>Dirección</h3>
                    <hr />
                </div>
                <div className='col-span-3'>
                    <div className="mb-1 block">
                        <Label htmlFor="street_name" value="Calle" />
                    </div>
                    <TextInput id="street_name" type="text" placeholder="" value={customer['street_name']} required onChange={handleChange} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="street_no" value="#" />
                    </div>
                    <TextInput id="street_no" type="text" placeholder="" value={customer['street_no']} required onChange={handleChange} />
                </div>
                <div className='col-span-3'>
                    <div className="mb-1 block">
                        <Label htmlFor="colony" value="Colonia" />
                    </div>
                    <TextInput id="colony" type="text" placeholder="" value={customer['colony']} required onChange={handleChange} />
                </div>
                <div className='col-span-4'>
                    <h3>Servicio</h3>
                    <hr />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="serviceCost" value="Importe" />
                    </div>
                    <TextInput id="serviceCost" type="number" placeholder="" value={customer['serviceCost']} required onChange={handleChange} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="serviceDay" value="Día de servicio" />
                    </div>
                    <TextInput id="serviceDay" type="text" placeholder="" value={customer['serviceDay']} required onChange={handleChange} />
                </div>
                <fieldset className=" flex max-w-md flex-col gap-4">
                    <legend className="mb-2 text-[14px]">Cobro </legend>
                    <div className="flex items-center gap-2">
                        <Radio id="monthly" name="servicePeriod" value="mensual" onChange={handleChange}
                            checked={customer['servicePeriod'] === 'mensual'}
                        />
                        <Label htmlFor="monthly">Mensual</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="biweekly" name="servicePeriod" value="bimestral" onChange={handleChange}
                            checked={customer['servicePeriod'] === 'bimestral'}
                        />
                        <Label htmlFor="biweekly">Bimestral</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="weekly" name="servicePeriod" value="anual" onChange={handleChange}
                            checked={customer['servicePeriod'] === 'anual'}
                        />
                        <Label htmlFor="weekly">Anual</Label>
                    </div>

                </fieldset>
                {/* Si el servicio es bimestral, elegir mes par o impar (serviceType)*/}
                {customer['servicePeriod'] === 'bimestral' &&
                    <fieldset className=' flex max-w-md flex-col gap-4'>
                        <legend className="mb-2 text-[14px]">Mes de servicio</legend>
                        <div className="flex items-center gap-2">
                            <Radio id="even" name="serviceType" value="par" onChange={handleChange}
                                checked={customer['serviceType'] === 'par'}
                            />
                            <Label htmlFor="even">Par</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="odd" name="serviceType" value="impar" onChange={handleChange}
                                checked={customer['serviceType'] === 'impar'}
                            />
                            <Label htmlFor="odd">Impar</Label>
                        </div>
                    </fieldset>
                }
                {/* Si el servicio es anual, elegir mes (serviceType)*/}
                {customer['servicePeriod'] === 'anual' &&
                    <fieldset className=' flex max-w-md flex-col gap-4'>
                        <legend className="mb-2 text-[14px]">Mes de servicio</legend>
                        <Select id="serviceType" onChange={handleChange} value={customer['serviceType']}>
                            <option value="enero">Enero</option>
                            <option value="febrero">Febrero</option>
                            <option value="marzo">Marzo</option>
                            <option value="abril">Abril</option>
                            <option value="mayo">Mayo</option>
                            <option value="junio">Junio</option>
                            <option value="julio">Julio</option>
                            <option value="agosto">Agosto</option>
                            <option value="septiembre">Septiembre</option>
                            <option value="octubre">Octubre</option>
                            <option value="noviembre">Noviembre</option>
                            <option value="diciembre">Diciembre</option>
                        </Select>
                    </fieldset>
                }
                <div className='col-span-4'>
                    <h3>Estado</h3>
                    <hr />
                </div>
                <ToggleSwitch checked={customer['active']} label="Activo / Inactivo" onChange={(checked) => setCustomer({ ...customer, active: checked })} />

                {customer['active'] && customer['registedAt'] &&
                    <div className='flex items-center col-span-2'>

                        <span className='text-xs text-gray-600' >
                            Fecha de ingreso: <span className='text-gray-900'>{new Date(customer['registedAt']).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </span>
                    </div>
                }
                {!customer['active'] && customer['cancelDate'] &&
                    <div className='flex items-center col-span-2'>
                        <span className='text-xs text-gray-600' >
                            Fecha de cancelación: <span className='text-gray-900'>{new Date(customer['cancelDate']).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </span>
                    </div>
                }
                <div className="flex items-center gap-2 col-span-1">
                    <Checkbox id="printq" checked={customer['printq']} onChange={handleChange} />
                    <Label htmlFor="printq" className="flex">
                        Añadir a la cola de impresión
                        <HiPrinter className='text-gray-500 text-2xl mx-2' />
                    </Label>
                </div>

                <div className='col-span-4 my-4'>
                    <Button type='submit' className='w-32 ml-auto'>Guardar</Button>
                </div>

            </Form>
        </div>

    );
};

export default CustomerForm;