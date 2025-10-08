import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Categoria } from '../entities/categoria.entity';
import { CategoriaService } from '../service/categoria.service';

@Controller('categorias')
@ApiTags('Categoria')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.categoriaService.findById(id);
  }

  @Get('nome/:nome')
  findByName(@Param('nome') nome: string) {
    return this.categoriaService.findByName(nome);
  }

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  @Put()
  update(@Body() categoria: Categoria) {
    return this.categoriaService.update(categoria);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriaService.delete(id);
  }
}
