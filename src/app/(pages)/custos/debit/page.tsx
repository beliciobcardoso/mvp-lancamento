'use client';
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getFornecedorByName, getLancamentoById } from "@/lib/actions";
import { useEffect, useState } from "react";

type Fornecedor = { id: number; nome: string; cnpj: string; created_at: Date; updated_at: Date; } | null;
type Lancamento = {
    id: number;
    fornecedor_id: number;
    tipo_id: number;
    valor: number;
    descricao: string;
    created_at: Date;
    updated_at: Date;
};

export default function Debit() {
    const [fornecedor, setFornecedor] = useState<Fornecedor>(null);
    const [fornecedorName, setFornecedorName] = useState("");
    const [error, setError] = useState<Error | null>(null);
    const [lancamento, setLancamento] = useState<Lancamento | null>();

    useEffect(() => {
        if (fornecedorName) {
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
        }
    }, [fornecedorName]);

    useEffect(() => {
        if (fornecedor) {
            getLancamentoById(fornecedor.id).then((lancamento) => {
                return setLancamento(lancamento);
            }).catch((error) => {
                setError(error);
            });
        }
    }, [fornecedor]);


console.log(lancamento)
console.log(fornecedor)


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
                    <Separator className="mt-2" />
                </div>
                <div>
                    <h1>{!fornecedor ? "Fornecedor..." : fornecedor.nome}</h1>
                    <h2>{`Total de dividas: R$ ${lancamento?.valor}`}</h2>
                    <div className="flex items-center gap-2">
                        <Label>Descontar</Label>
                        <Input placeholder="2.000,00" className="w-22" />
                        <Button>Descontar</Button>
                    </div>
                    <div>
                        <h2>Proximo saldo a debitar: R$ 3.000,00</h2>
                    </div>
                </div>
            </div>
        </main>
    );
}
