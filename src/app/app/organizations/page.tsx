"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function OrganizationsPage() {
    const [orgs, setOrgs] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("organizations")
                .select("*")
                .order("razao_social");

            if (!error && data) setOrgs(data);
        })();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold mb-4">Organizations</h1>

            <div className="space-y-2">
                {orgs.map((org) => (
                    <div key={org.organization_id} className="border p-3 rounded">
                        <div className="font-medium">{org.razao_social}</div>
                        <div className="text-sm text-gray-500">
                            {org.nome_fantasia}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
