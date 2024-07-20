import { useState, useEffect } from 'react';

// Hook personalizado useDebounce
export const useDebounce= (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configurar un temporizador que actualiza el valor después del retraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el temporizador si el valor cambia antes de que termine el retraso
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}