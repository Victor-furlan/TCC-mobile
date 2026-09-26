import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "./authContexto";

export type Assinatura = {
  id: string;
  nome: string;
  valor: number;
  periodicidade: string;
  categoria: string;
  proxima_cobranca: string;
  ativa: boolean;
  humor: string;
  motivo: string;
  nivel_arrependimento: number;
};

type NovaAssinatura = Omit<Assinatura, 'id' | 'ativa'>;

type AssinaturaContextoTipo = {
    assinaturas: Assinatura[];
    carregando: boolean;
    adicionarAssinatura: (assinatura: NovaAssinatura) => Promise<{erro: string | null}>;
};

const AssinaturaContexto = createContext<AssinaturaContextoTipo>({} as AssinaturaContextoTipo);

export function AssinaturasProvider({children}: {children: React.ReactNode}) {
    const {session} = useAuth();
    const [assinaturas, setAssinatuas] = useState<Assinatura[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!session?.user) {
            setAssinatuas([]);
            setCarregando(false);
            return;
        }
        buscarAssinaturas(session.user.id);

        //isso aqui serve pra conectar ao realtime do supabase, pra atualizar em tempo real quando algo acontecer entre web e mobile
        const canal = supabase
                      .channel('assinaturas_realtime')
                      .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'assinaturas',
                        filter: `user_id=eq.${session.user.id}`,
                      }, () => {
                        buscarAssinaturas(session?.user.id);
                      })
                      .subscribe();

        return () => { supabase.removeChannel(canal);};
    },[session]);

    async function buscarAssinaturas(userId: string) {
        const {data} = await supabase
                             .from('assinaturas')
                             .select('*')
                             .eq('user_id', userId)
                             .eq('ativa', true)
                             .order('proxima_cobranca', {ascending: true});

        setAssinatuas(data ?? []);
        setCarregando(false);
    }

    async function adicionarAssinatura(assinatura: NovaAssinatura) {
        if (!session?.user) return {erro: 'Usuário não autenticado'};

        const {data, error} = await supabase
                                    .from('assinaturas')
                                    .insert({ ...assinatura, user_id: session.user.id, ativa: true})
                                    .select()
                                    .single();

        if(error) return {erro: 'Erro ao salvar assinatura'};

        setAssinatuas((prev) =>
          [...prev, data].sort((a, b) =>
            a.proxima_cobranca.localeCompare(b.proxima_cobranca),
          ),
        );
        return {erro: null};
    }

    return (
        <AssinaturaContexto.Provider value={{ assinaturas, carregando, adicionarAssinatura}}>
            {children}
        </AssinaturaContexto.Provider>
    );
}

export const useAssinaturas = () => useContext(AssinaturaContexto);