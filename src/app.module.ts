import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/task.module';
import { CategoryModule } from './categories/category.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [TaskModule, CategoryModule, UserModule],
})
  
// @Module({
//   imports: [CategoryModule],
// })
export class AppModule {}
