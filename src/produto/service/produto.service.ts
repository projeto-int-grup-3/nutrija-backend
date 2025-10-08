import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto) {
      throw new HttpException('produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }

  async findProdutoSimilar(id: number): Promise<Produto[]> {
    const produto = await this.findById(id);
    return await this.produtoRepository
      .createQueryBuilder('produto')
      .innerJoin('produto.categoria', 'categoria')
      .where('categoria.id = :catId', { catId: produto.categoria.id })
      .andWhere('produto.id != :id', { id: produto.id })
      .andWhere('produto.quantidade > 0')
      .setParameter('preco', produto.preco)
      .orderBy('ABS(produto.preco - :preco)', 'ASC')
      .getMany();
  }
}
