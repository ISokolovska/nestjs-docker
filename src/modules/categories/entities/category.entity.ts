import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
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
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'date-created' })
  dateCreated: Date;

  @Column({ name: 'user-id' })
  userId: number;

  @OneToMany(() => Task, (task) => task.taskId)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.id)
  users: User[];
}
