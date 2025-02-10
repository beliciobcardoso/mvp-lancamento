'use client';
import Header from "@/components/header";
import { listFornecedores } from "@/lib/actions";

export type Fornecedor = {
  id?: number;
  nome: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
}[];

import { useEffect, useState } from "react";

export default function List() {
  const [fornecedores, setFornecedores] = useState<Fornecedor | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    listFornecedores()
      .then((data) => setFornecedores(data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (
      <main className="flex flex-col p-4">
        <Header title="List Fornecedores" />
        <p>Carregando...</p>
      </main>
    );
  }
  if (fornecedores instanceof Error) {
    return (
      <main className="flex flex-col p-4">
        <Header title="List Fornecedores" />
        <p>Ocorreu um erro ao carregar os fornecedores</p>
      </main>
    );
  }

  if (fornecedores && fornecedores.length === 0) {
    return (
      <main className="flex flex-col p-4">
        <Header title="List Fornecedores" />
        <p>Nenhum fornecedor encontrado</p>
      </main>
    );
  }



  return (
    <main className="flex flex-col">
      <Header title="List Fornecedores" />
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cnpj
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data do lancamento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Example row */}
          {fornecedores && fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fornecedor.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fornecedor.cnpj}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fornecedor.created_at.toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
              </td>
            </tr>
          ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </main>
  );
}