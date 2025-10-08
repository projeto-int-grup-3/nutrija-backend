import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: { produto: true },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: { produto: true },
    });
    if (!categoria) {
      throw new HttpException('ID não encontrado', HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async findByName(nome: string): Promise<Categoria[]> {
    const categoria = await this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
    if (!categoria) {
      throw new HttpException('Nome não encontrado', HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    const categoriaNova = this.categoriaRepository.create(categoria);
    return await this.categoriaRepository.save(categoriaNova);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.findById(categoria.id);
    return await this.categoriaRepository.save(categoriaExistente);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoriaRepository.delete(id);
  }
}
