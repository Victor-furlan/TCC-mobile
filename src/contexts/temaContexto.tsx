import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TemaOpcao = 'claro' | 'escuro' | 'sistema';

type TemaContextoTipo = {
  tema: TemaOpcao;
  isDark: boolean;
  setTema: (tema: TemaOpcao) => void;
};

const TemaContexto = createContext<TemaContextoTipo>({
  tema: 'sistema',
  isDark: false,
  setTema: () => {},
});

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const sistemaTema = useColorScheme();
  const [tema, setTemaState] = useState<TemaOpcao>('sistema');

  // Carrega preferência salva no AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('tema').then(valor => {
      if (valor === 'claro' || valor === 'escuro' || valor === 'sistema') {
        setTemaState(valor);
      }
    });
  }, []);

  function setTema(novoTema: TemaOpcao) {
    setTemaState(novoTema);
    AsyncStorage.setItem('tema', novoTema);
  }

  const isDark =
    tema === 'escuro' ? true :
    tema === 'claro' ? false :
    sistemaTema === 'dark';

  return (
    <TemaContexto.Provider value={{ tema, isDark, setTema }}>
      {children}
    </TemaContexto.Provider>
  );
}

export function useTema() {
  return useContext(TemaContexto);
}