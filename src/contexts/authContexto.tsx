import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";

type AuthContextoTipo = {
    session: Session | null;
    usuario: User | null;
    carregando: boolean;
    signIn: (email: string, senha: string) => Promise<{erro: string | null}>;
    signUp: (email: string, senha: string, nome: string) => Promise<{erro: string | null}>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{erro: string | null}>;
};

const AuthContexto = createContext<AuthContextoTipo>({} as AuthContextoTipo);

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [session, setSession] = useState<Session | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setCarregando(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function signIn(email: string, senha: string) {
        const { error } = await supabase.auth.signInWithPassword({email, password: senha});
        return {erro: traduzirErro(error?.message)};
    }

    async function signUp(email: string, senha: string, nome: string) {
        const {data, error} = await supabase.auth.signUp({
            email,
            password: senha,
            options: {data: { nome }},
        });
        if (error) return {erro: traduzirErro(error?.message)};
        return {erro: null}
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function resetPassword(email: string) {
        const {error} = await supabase.auth.resetPasswordForEmail(email);
        return { erro: traduzirErro(error?.message)}
    }

    return (
        <AuthContexto.Provider value={{session, usuario: session?.user ?? null, carregando, signIn, signUp, signOut, resetPassword}}>
            {children}
        </AuthContexto.Provider>
    );
}

export const useAuth = () => useContext(AuthContexto);

function traduzirErro(msg?: string): string | null {
    if (!msg) return null;
    if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
    if (msg.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if (msg.includes("User already registered")) return "Este e-mail já está cadastrado.";
    if (msg.includes("Password should be at least")) return "A senha deve ter pelo menos 6 caracteres.";
    if (msg.includes("Unable to validate email")) return "E-mail inválido.";
    return "Ocorreu um erro. Tente novamente.";     
}