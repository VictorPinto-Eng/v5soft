"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setErr(null);
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://siga.hv5.com.br/reset-password",
        });

        setLoading(false);

        if (error) {
            setErr(error.message);
            return;
        }

        setMsg("Se este e-mail estiver cadastrado, você receberá um link de recuperação em breve.");
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Informe seu e-mail para receber o link de redefinição.
                    </p>
                </div>

                <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    {err && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <p className="text-sm text-red-700 font-medium">{err}</p>
                        </div>
                    )}

                    {msg && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4">
                            <p className="text-sm text-green-700 font-medium">{msg}</p>
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold p-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Enviando...
                            </>
                        ) : "Enviar link de recuperação"}
                    </button>

                    <div className="text-center">
                        <a href="/" className="text-sm text-gray-600 hover:text-black hover:underline transition-all">
                            Voltar ao login
                        </a>
                    </div>
                </form>
            </div>
        </main>
    );
}
