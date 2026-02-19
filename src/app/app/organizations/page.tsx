"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function OrganizationsPage() {
    const [orgs, setOrgs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("organizations")
                .select("*")
                .order("razao_social");

            if (!error && data) setOrgs(data);
            setLoading(false);
        })();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Organizações</h1>
                <p className="text-gray-500">Gerencie as empresas cadastradas no sistema.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orgs.map((org) => (
                        <div key={org.organization_id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{org.razao_social}</h3>
                            <p className="text-sm text-gray-500 mb-4">{org.nome_fantasia || "Sem nome fantasia"}</p>
                            <div className="flex justify-end pt-2 border-t border-gray-50">
                                <button className="text-xs font-semibold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
                                    Ver Detalhes →
                                </button>
                            </div>
                        </div>
                    ))}

                    {orgs.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">Nenhuma organização encontrada.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
