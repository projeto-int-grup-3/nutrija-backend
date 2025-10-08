import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Min(0)
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @IsNumber()
  @Column({ type: 'int', default: 0, nullable: false })
  @Min(0)
  quantidade: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'RESTRICT',
  })
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'SET NULL',
  })
  usuario?: Usuario;
}
