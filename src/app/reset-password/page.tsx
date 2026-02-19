"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function ResetPasswordContent() {
    const router = useRouter();
    const params = useSearchParams();

    const [status, setStatus] = useState<"idle" | "verifying" | "ready" | "loading" | "done">(
        "idle"
    );
    const [error, setError] = useState<string | null>(null);

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    useEffect(() => {
        const token = params.get("token");
        const type = params.get("type"); // esperado: "recovery"

        if (!token || !type) {
            setError("Link inválido ou expirado. Por favor, solicite uma nova recuperação.");
            return;
        }

        (async () => {
            setStatus("verifying");
            setError(null);

            const { error } = await supabase.auth.verifyOtp({
                token,
                type: type as any, // "recovery"
            } as any);

            if (error) {
                setError(error.message);
                setStatus("idle");
                return;
            }

            setStatus("ready");
        })();
    }, [params]);

    async function handleSetPassword(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("A senha precisa ter pelo menos 8 caracteres.");
            return;
        }
        if (password !== confirm) {
            setError("As senhas não conferem.");
            return;
        }

        setStatus("loading");
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
            setStatus("ready");
            return;
        }

        setStatus("done");

        // Pequeno delay para o usuário ver a mensagem de sucesso
        setTimeout(async () => {
            await supabase.auth.signOut();
            router.push("/");
        }, 2000);
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Redefinir Senha</h1>
                    <p className="text-sm text-gray-500 font-medium">
                        {status === "verifying" ? "Validando seu link de acesso..." : "Escolha sua nova senha de acesso."}
                    </p>
                </div>

                {status === "verifying" && (
                    <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                {(status === "ready" || status === "loading") && (
                    <form onSubmit={handleSetPassword} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Nova Senha</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={status === "loading"}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                disabled={status === "loading"}
                                required
                            />
                        </div>

                        <button
                            disabled={status === "loading"}
                            className="w-full bg-black hover:bg-gray-800 text-white font-semibold p-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === "loading" ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Salvando...
                                </>
                            ) : "Atualizar Senha"}
                        </button>
                    </form>
                )}

                {status === "done" && (
                    <div className="text-center space-y-3 py-4">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-gray-900">Senha atualizada com sucesso!</p>
                        <p className="text-sm text-gray-500">Redirecionando você para o login...</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </main>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
