import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Produto } from '../../produto/produto.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_nutrija',
      entities: [Produto, Usuario],
      synchronize: true,
    };
  }
}
