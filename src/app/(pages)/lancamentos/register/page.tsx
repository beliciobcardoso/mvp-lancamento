'use client';
import Header from "@/components/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createLancamento, listFornecedores, listTipos } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Tipo } from "../../tipos/list/page";
import { useEffect, useState } from "react";
import { Fornecedor } from "../../fornecedores/list/page";

const schema = z.object({
  fornecedor_id: z.string().min(1, "Fornecedor é obrigatório"),
  tipo_id: z.string().min(1, "Tipo é obrigatório"),
  valor: z.number().refine((value) => {
    return !z.number().int().safeParse(value).success && z.number().finite().safeParse(value).success;
  }, { message: "Valor é obrigatório" }),
  descricao: z.string().min(1, "Descrição é obrigatório"),

});

export type SchemaCreateLancamento = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter();
  const [tipos, setTipos] = useState<Tipo | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [fornecedores, setFornecedores] = useState<Fornecedor | null>(null);

  useEffect(() => {
    listTipos()
      .then((data) => setTipos(data))
      .catch((err) => setError(err));
    listFornecedores()
      .then((data) => setFornecedores(data))
      .catch((err) => setError(err));
  }
    , []);

  const { register, handleSubmit, formState: { errors } } = useForm<SchemaCreateLancamento>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SchemaCreateLancamento) => {
    const tipo_id = parseInt(data.tipo_id);
    const fornecedor_id = parseInt(data.fornecedor_id);
    const response = await createLancamento({
      fornecedor_id: fornecedor_id,
      tipo_id: tipo_id,
      valor: data.valor,
      descricao: data.descricao,
    });

    if (response instanceof Error) {
      console.error("Erro ao criar fornecedor:", response);
      return;
    }

    if (response) {
      router.push("/lancamentos/list");
    }

  };

  return (
    <>
      <Header title="Cadastra Lançamentos" />
      <main className="flex bg-gray-100 justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded">
          <div>
            <label htmlFor="fornecedor_id">Fornecedor</label>
            <select id="fornecedor_id" {...register("fornecedor_id")} className="border p-2 w-full">
              {fornecedores?.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
              ))}
            </select>
            {errors.fornecedor_id && <p className="text-red-500">{errors.fornecedor_id.message}</p>}
          </div>
          <div>
            <label htmlFor="tipo_id">Tipo</label>
            <select id="tipo_id" {...register("tipo_id")} className="border p-2 w-full">
              {tipos?.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>
            {errors.tipo_id && <p className="text-red-500">{errors.tipo_id.message}</p>}
          </div>
          <div>
            <label htmlFor="valor">Valor</label>
            <input id="valor" type="number" step="0.01" min="0" {...register("valor", { 
              valueAsNumber: true,
              setValueAs: v => parseFloat(parseFloat(v).toFixed(2))
            })} className="border p-2 w-full" />
            {errors.valor && <p className="text-red-500">{errors.valor.message}</p>}
          </div>
          <div>
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" {...register("descricao")} className="border p-2 w-full" />
            {errors.descricao && <p className="text-red-500">{errors.descricao.message}</p>}
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Cadastrar</button>
        </form>
      </main>
    </>
  );
}