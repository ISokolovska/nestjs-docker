import { Category } from 'src/modules/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'date_start' })
  dateStart: Date;

  @CreateDateColumn({ name: 'date_end' })
  dateEnd: Date;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  categories: Category[];
}
