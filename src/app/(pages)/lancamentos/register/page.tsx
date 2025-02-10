'use client';
import Header from "@/components/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createFornecedor } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ deve ter no mínimo 14 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await createFornecedor({
      nome: data.nome,
      cnpj: data.cnpj,
    });

    if (response instanceof Error) {
      console.error("Erro ao criar fornecedor:", response);
      return;
    }

    if (response) {
      router.push("/fornecedores/list");
    }

  };

  return (
    <>
      <Header title="Cadastra Lançamentos" />
      <main className="flex bg-gray-100 justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded">
          <div>
            <label htmlFor="nome">Nome</label>
            <input id="nome" {...register("nome")} className="border p-2 w-full" />
            {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="cnpj">CNPJ</label>
            <input id="cnpj" {...register("cnpj")} className="border p-2 w-full" />
            {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Cadastrar</button>
        </form>
      </main>
    </>
  );
}