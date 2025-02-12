'use client';
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getFornecedorByName, listFornecedores } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function Debit() {
    const [fornecedor, setFornecedor] = useState("");
    const [fornecedorName, setFornecedorName] = useState("");
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (fornecedor) {
            const delayDebounceFn = setTimeout(() => {
                getFornecedorByName(fornecedor).then((fornecedor) => {
                    if (fornecedor) {
                        setFornecedorName(fornecedor.nome);
                    }
                }).catch((error) => {
                    setError(error);
                });
            }, 300); // delay for 300ms

            return () => clearTimeout(delayDebounceFn);
        }
    }, [fornecedor]);

    return (
        <main className="flex flex-col">
            <Header title="Debitar Custos" />
            <div className="flex flex-col p-4">
                <div>
                    <Input 
                    onChange={(e) => setFornecedor(e.target.value)} 
                    placeholder="Fornecedore..." 
                    className="w-22"
                    value={fornecedor}
                    />
                    <Separator className="mt-2" />
                </div>
                <div>
                    <h1>{!fornecedorName ? "Fornecedor..." :  fornecedorName}</h1>
                    <h2>Total de dividas: R$ 5.000,00</h2>
                    <div className="flex items-center gap-2">
                        <Label>Descontar</Label>
                        <Input placeholder="2.000,00" className="w-22"/>
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
