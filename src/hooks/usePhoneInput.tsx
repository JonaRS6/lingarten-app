import { useState } from 'react';

// Hook personalizado useDebounce
export const usePhoneInput= () => {
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  
    const formatPhoneNumber = (value: string) => {
      // Eliminar todo lo que no sean números
      const phoneNumber = value.replace(/\D/g, '');
      const phoneNumberLength = phoneNumber.length;
  
      // Formatear el número basado en su longitud
      if (phoneNumberLength < 4) {
        return phoneNumber;
      } else if (phoneNumberLength < 7) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
      } else {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      }
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormattedPhoneNumber(formatPhoneNumber(value));
      setRawPhoneNumber(value.replace(/\D/g, ''));
    };

  return { formattedPhoneNumber, rawPhoneNumber, handleChange };
}