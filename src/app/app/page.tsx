"use client";

export default function AppHome() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Bem-vindo ao painel administrativo da HV5.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Organizações</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
                    <p className="text-xs text-green-600 mt-2 font-medium">↑ Atualizado recentemente</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Usuários Ativos</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
                    <p className="text-xs text-gray-400 mt-2">Aguardando dados...</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status do Sistema</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-lg font-bold text-gray-900">Operacional</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Todos os serviços ativos</p>
                </div>
            </div>
        </div>
    );
}
