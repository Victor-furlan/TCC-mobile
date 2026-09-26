// src/constants/useCores.ts
import { useTema } from '@/contexts/temaContexto';
import { CoresEscuro, CoresClaro } from './cores';

export function useCores() {
  const { isDark } = useTema();
  return isDark ? CoresEscuro : CoresClaro;
}