"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AppHome() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push("/login");
                return;
            }
            setLoading(false);
        })();
    }, [router]);

    if (loading) return <div className="p-6">Carregando...</div>;

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold">Painel Admin</h1>
            <a href="/app/organizations" className="underline">
                Ir para Organizations
            </a>
        </main>
    );
}
