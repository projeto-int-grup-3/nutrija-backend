import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/produto.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 2500, nullable: false })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
