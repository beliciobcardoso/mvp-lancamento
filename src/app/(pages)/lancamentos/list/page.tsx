'use client';
import Header from "@/components/header";
import { listLancamentos } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Tipo } from "../../tipos/list/page";
import { Fornecedor } from "../../fornecedores/list/page";

type Lancamento = {
  id?: number;
  fornecedor: number;
  tipo: number;
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
        fornecedor: item.fornecedor_id,
        tipo: item.tipo_id,
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
          </tbody>
      </table>
    </main>
  );
}