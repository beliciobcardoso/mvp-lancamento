'use client';
import Header from "@/components/header";
import { listTipos } from "@/lib/actions";
import { useEffect, useState } from "react";

export type Tipo = {
    id?: number;
    nome: string;
    created_at: Date;
    updated_at: Date;
}[];

export default function ListTipos() {
    const [tipos, setTipos] = useState<Tipo | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        listTipos()
            .then((data) => setTipos(data))
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return (
            <main className="flex flex-col">
                <Header title="List Tipos de Lançamentos" />
                <main className="flex justify-center items-center h-full">
                    <p>Carregando...</p>
                </main>
            </main>
        );
    }

    if (tipos instanceof Error) {
        return (
            <main className="flex flex-col">
                <Header title="List Tipos de Lançamentos" />
                <main className="flex justify-center items-center h-full">
                    <p>Ocorreu um erro ao carregar os tipos de lançamentos</p>
                </main>
            </main>
        );
    }

    if (tipos && tipos.length === 0) {
        return (
            <main className="flex flex-col h-screen">
                <Header title="List Tipos de Lançamentos" />
                <main className="flex justify-center items-center h-full">
                    <p>Nenhum tipo de lançamento encontrado</p>
                </main>
            </main>
        );
    }


    return (
        <main className="flex flex-col">
            <Header title="List Tipos de Lançamentos" />
            <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data do cadastro
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tipos && tipos.map((tipo) => (
                        <tr key={tipo.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {tipo.nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(tipo.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                            </td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
        </main>
    );
}   