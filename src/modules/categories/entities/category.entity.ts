import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(() => Task, (task) => task.categoryId)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User[];
}
