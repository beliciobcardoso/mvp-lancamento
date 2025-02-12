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

export async function getFornecedorByName(nome: string) {
  try {
    const fornecedor = await prisma.fornecedor.findFirst({
      where: {
        nome: {
          endsWith: nome,
        }
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

    if (!fornecedor) {
      throw new Error('Erro ao criar fornecedor');
    }

    await prisma.debitado_fornecedor.create({
      data: {
        fornecedor_id: fornecedor.id,
        valor: 0,
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
    const tipo = await prisma.tipo_lancamento.create({
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
    const tipos = await prisma.tipo_lancamento.findMany();
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
    const lancamento = await prisma.lancamento_fornecedor.create({
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
    const lancamentos = await prisma.lancamento_fornecedor.findMany({
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

export async function getLancamentoById(fornecedor_id: number) {
  try {
    const lancamento = await prisma.lancamento_fornecedor.findFirst({
      where: {
        fornecedor_id,
      },
    });
    return lancamento;
  } catch (error) {
    console.error('Erro ao buscar lancamento:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function debitLancamento(id: number, valor: number) {
  try {
    const fornecedor = await prisma.lancamento_fornecedor.findUnique({
      where: {
        id,
      },
    });

    if (!fornecedor) {
      throw new Error('Forncedor não encontrado');
    }

    const debitar = await prisma.debitado_fornecedor.create({
      data: {
        valor,
        fornecedor_id: fornecedor.fornecedor_id,
        created_at: new Date(),
      },
    });
    return debitar;
  } catch (error) {
    console.error('Erro ao debitar lancamento:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}