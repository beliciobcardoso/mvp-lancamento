'use client';
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getFornecedorByName, getTotalLancamentoById } from "@/lib/actions";
import { formatCurrency } from "@/lib/formatCurrency";
import { useEffect, useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

type Fornecedor = { id: number; nome: string; cnpj: string; created_at: Date; updated_at: Date; }
type Lancamento = {
    id: number;
    fornecedor_id: number;
    tipo_id: number;
    valor: number;
    descricao: string;
    created_at: Date;
    updated_at: Date;
};


const formSchema = z.object({
    valorDesconta: z.string().min(2).max(5).refine((val) => !isNaN(parseFloat(val)), {
        message: "O valor deve ser um número",
    }),
})

export default function Debit() {
    const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
    const [fornecedorName, setFornecedorName] = useState("");
    const [totalDividas, setTotalDividas] = useState<number | null>(null);
    const [valor, setValor] = useState<string>("");
    const [lancamento, setLancamento] = useState<number | null>(null);
    const [saldo, setSaldo] = useState<number | null>(null);
    const [debitar, setDebitar] = useState<number | null>(null);
    const [saldoDebitar, setSaldoDebitar] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        let floatValue = parseFloat(value) / 100;
        setValor(floatValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
    };


    useEffect(() => {
        if (fornecedorName !== "") {
            const delayDebounceFn = setTimeout(() => {
                const res = getFornecedorByName(fornecedorName).then((fornecedor) => {
                    if (fornecedor) {
                        setFornecedor(fornecedor);
                    }
                }).catch((error) => {
                    setError(error);
                });
            }, 300); // delay for 300ms

            return () => clearTimeout(delayDebounceFn);
        } else {
            setFornecedor(null)
        }
    }, [fornecedorName]);

    useEffect(() => {
        if (fornecedor !== null) {
            getTotalLancamentoById(fornecedor.id).then((total) => {
                return setTotalDividas(total);
            }).catch((error) => {
                setError(error);
            });
        } else {
            setTotalDividas(null);
        }
    }, [fornecedor]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            valorDesconta: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <main className="flex flex-col">
            <Header title="Debitar Custos" />
            <div className="flex flex-col p-4">
                <div>
                    <Input
                        onChange={(e) => setFornecedorName(e.target.value)}
                        placeholder="Fornecedore..."
                        className="w-22"
                        value={fornecedorName}
                    />
                    <Separator className="mt-4" />
                </div>
                <div className="flex flex-col gap-4 pt-2">
                    <h1>{!fornecedor ? "Fornecedor..." : fornecedor.nome}</h1>
                    <h2>{`Total de dividas: ${totalDividas === null ? "00,00" : formatCurrency(totalDividas)}`}</h2>
                    <div className="flex items-center gap-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="valorDesconta"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl onChange={handleValorChange}>
                                                <Input
                                                    placeholder="2.000,00"
                                                    {...field}
                                                    value={valor}
                                                    className="w-22" />
                                            </FormControl>
                                            <FormDescription>
                                                Digite o valor a descontar.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button>Descontar</Button>
                            </form>
                        </Form>
                    </div>
                    <div>
                        <h2>Saldo a debitar: R$ 3.000,00</h2>
                    </div>
                    <div>
                        <h2>Proximo saldo a debitar: R$ 3.000,00</h2>
                    </div>
                </div>
            </div>
        </main>
    );
}
