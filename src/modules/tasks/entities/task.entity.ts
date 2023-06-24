import { Category } from 'src/modules/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'date-start' })
  dateStart: Date;

  @Column({ name: 'date-end' })
  dateEnd: Date;

  @Column({ name: 'task-id' })
  taskId: number;

  @ManyToOne(() => Category, (category) => category.id)
  categories: Category[];
}
