'use server';
import prisma from "./prisma";
import { SchemaCreateLancamento } from "@/app/(pages)/lancamentos/register/page";

export async function listFornecedores() {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    return fornecedores;
  } catch (error) {
    console.error('Erro ao listar fornecedores:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getFornecedorById(id: number) {
  try {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: {
        id,
      },
    });
    return fornecedor;
  } catch (error) {
    console.error('Erro ao buscar fornecedor:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function createFornecedor(data: { nome: string; cnpj: string }) {
  try {
    const fornecedor = await prisma.fornecedor.create({
      data: {
        ...data,
        created_at: new Date(),
      },
    });
    return fornecedor;
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createTipo(data: { nome: string }) {
  try {
    const tipo = await prisma.tipo_produto.create({
      data: {
        ...data,
        created_at: new Date(),
      },
    });
    return tipo;
  } catch (error) {
    console.error('Erro ao criar tipo:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function listTipos() {
  try {
    const tipos = await prisma.tipo_produto.findMany();
    return tipos;
  } catch (error) {
    console.error('Erro ao listar tipos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createLancamento(data: Omit<SchemaCreateLancamento, 'fornecedor_id' | 'tipo_id'> & { fornecedor_id: number; tipo_id: number; }) {
  try {
    const lancamento = await prisma.desconto_fornecedor.create({
      data: {
        ...data,
        created_at: new Date(),
      },
    });
    return lancamento;
  } catch (error) {
    console.error('Erro ao criar lancamento:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function listLancamentos() {
  try {
    const lancamentos = await prisma.desconto_fornecedor.findMany({
      select: {
        id: true,
        fornecedor_id: true,
        tipo_id: true,
        valor: true,
        descricao: true,
        created_at: true,
        fornecedor: {
          select: {
            nome: true,
          },
        },
        tipo: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return lancamentos;
  } catch (error) {
    console.error('Erro ao listar lancamentos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}