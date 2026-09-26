import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "./authContexto";

export type Despesas = {
    id: string;
    nome: string;
    valor: number;
    data: string;
    categoria: string;
    humor: string;
    motivo: string;
    nivel_arrependimento: number;
};

type NovaDespesa = Omit<Despesas, 'id'>;

type DespesasContextoTipo = {
    despesas: Despesas[];
    carregando: boolean;
    adicionarDespesa: (despesa: NovaDespesa) => Promise<{erro: string | null}>;
};

const DespesasContexto = createContext<DespesasContextoTipo>({} as DespesasContextoTipo);

export function DespesasProvider({children} : { children: React.ReactNode}) {
    const {session} = useAuth();
    const [despesas, setDespesas] = useState<Despesas[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!session?.user) {
            setDespesas([]);
            setCarregando(false);
            return;
        }
        buscarDespesas(session.user.id);

        //isso aqui serve pra conectar ao realtime do supabase, pra atualizar em tempo real quando algo acontecer entre web e mobile
        const canal = supabase
                      .channel('despesas_realtime')
                      .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'despesas',
                        filter: `user_id=eq.${session.user.id}`,
                        }, (payload) => {
                            console.log('realtime event:', payload);
                            buscarDespesas(session.user.id);
                      })
                      .subscribe();
        return () => { supabase.removeChannel(canal); };
    }, [session]);

    async function buscarDespesas(userId: string) {
        const agora = new Date();
        const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString().split('T')[0];
        const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).toISOString().split('T')[0];

        const {data} = await supabase
                             .from('despesas')
                             .select('*')
                             .eq('user_id', userId)
                             .gte('data', inicioMes)
                             .lte('data', fimMes)
                             .order('data', {ascending: false});

        setDespesas(data ?? []);
        setCarregando(false);
    }

    async function adicionarDespesa(despesa: NovaDespesa) {
        if (!session?.user) return {erro: 'Usuário não autenticado.'};

        const {data, error} = await supabase
                                    .from('despesas')
                                    .insert({ ...despesa, user_id: session.user.id})
                                    .select()
                                    .single();
        console.log('supabase error:', error);
        if (error) return {erro: 'Erro ao salvar despesa.'};

        setDespesas(prev => [data, ...prev]);
        return {erro: null};
    }

    return (
        <DespesasContexto.Provider value={{ despesas, carregando, adicionarDespesa}}>
            {children}
        </DespesasContexto.Provider>
    );
}

export const useDespesas = () => useContext(DespesasContexto);