'use client';
import { useRouter } from 'next/navigation';
import { createTipo } from '@/lib/actions';
import Header from '@/components/header';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterTipo() {
    const router = useRouter();

     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
      });
    

    const onSubmit = async (data: FormData) => {
        const response = await createTipo({
            nome: data.nome,
        });

        if (response instanceof Error) {
            console.error("Erro ao criar tipo de lançamento:", response);
            return;
        }

        if (response) {
            router.push("/tipos/list");
        }
    }
  

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
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Cadastrar</button>
                </form>
            </main>
        </>
    );
}
