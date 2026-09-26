import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "./authContexto";
import { UsuarioTipo } from "@/types/usuarioTipo";

type UsuarioContextoTipo = {
    usuario: UsuarioTipo | null;
    carregando: boolean;
    atualizarRenda: (renda: number) => Promise<void>;
    atualizarHoras: (horas: number) => Promise<void>;
};

const UsuarioContexto = createContext<UsuarioContextoTipo>({} as UsuarioContextoTipo);

export function UsuarioProvider({children}: {children: React.ReactNode}) {
    const {session} = useAuth();
    const [usuario, setUsuario] = useState<UsuarioTipo | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!session?.user) {
            setUsuario(null);
            setCarregando(false);
            return;
        }

        async function buscarUsuario() {
            const {data} = await supabase
                                 .from("usuarios")
                                 .select("*")
                                 .eq("id", session!.user.id)
                                 .single();
            
            if (data) setUsuario(data);
            setCarregando(false);
        }

        buscarUsuario();
    },[session]);

    async function atualizarRenda(renda: number) {
        if (!session?.user) return;
        await supabase
              .from("usuarios")
              .update({ renda_mensal: renda})
              .eq("id", session.user.id);
        setUsuario((prev) => prev ? { ...prev, renda_mensal: renda} : prev);
    }

    async function atualizarHoras(horas: number) {
        if(!session?.user) return;
        await supabase
              .from("usuarios")
              .update({horas_trabalhadas: horas})
              .eq("id", session.user.id);
        setUsuario((prev) => prev ? { ...prev, horas_trabalhadas: horas} : prev);
    }

    return (
        <UsuarioContexto.Provider value={{usuario, carregando, atualizarRenda, atualizarHoras}}>
            {children}
        </UsuarioContexto.Provider>
    );
}

export const useUsuario = () => useContext(UsuarioContexto);