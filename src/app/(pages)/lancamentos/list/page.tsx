'use client';
import Header from "@/components/header";
import { listLancamentos } from "@/lib/actions";
import { formatCurrency } from "@/lib/formatCurrency";
import { useEffect, useState } from "react";

export type Lancamento = {
  id: number;
  fornecedorName: string;
  tipoName: string;
  valor: number;
  descricao: string;
  created_at: Date;
}[]

export default function List() {
  const [lancamentos, setLancamentos] = useState<Lancamento | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    listLancamentos()
      .then((data) => setLancamentos(data.map(item => ({
        id: item.id,
        fornecedorName: item.fornecedor.nome,
        tipoName: item.tipo.nome,
        valor: item.valor,
        descricao: item.descricao,
        created_at: item.created_at,
      }))))
      .catch((err) => setError(err));      
  }, []);

  return (
    <main className="flex flex-col">
      <Header title="List Lançamentos" />
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fornecedor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo de lançamento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data do lançamento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lancamentos?.map((lancamento, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lancamento.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lancamento.fornecedorName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lancamento.tipoName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatCurrency(lancamento.valor)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lancamento.descricao}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lancamento.created_at.toLocaleDateString() +" - "+ lancamento.created_at.toLocaleTimeString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={`/lancamentos/edit/${lancamento.id}`} className="text-indigo-600 hover:text-indigo-900">Editar</a>
              </td>
            </tr>
          ))}
          </tbody>
      </table>
    </main>
  );
}