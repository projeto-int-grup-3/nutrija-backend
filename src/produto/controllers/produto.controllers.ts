import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';

@Controller('/produtos')
@UseGuards(JwtAuthGuard)
@ApiTags('Produto')
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoSevice: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoSevice.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoSevice.findById(id);
  }

  @Get('/similar/:id')
  @HttpCode(HttpStatus.OK)
  findProdutoSimilar(@Param('id', ParseIntPipe) id: number): Promise<Produto[]> {
    return this.produtoSevice.findProdutoSimilar(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByAllNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoSevice.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoSevice.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoSevice.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoSevice.delete(id);
  }
}
