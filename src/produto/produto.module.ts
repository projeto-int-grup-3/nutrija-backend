import { Produto } from './produto.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './service/produto.service';
import { ProdutoController } from './controllers/produto.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class PostagemModule {}
