// import { EntitySchema } from 'typeorm';
// import { User } from './entities/user.entity';

// export const UserSchema = new EntitySchema<User>({
//   name: 'User',
//   target: User,
//   columns: {
//     id: {
//       type: Number,
//       primary: true,
//       generated: true,
//     },
//     role: {
//       type: String,
//     },
//   },
//   relations: {
//     categories: {
//       type: 'one-to-many',
//       target: 'Category', // the name of the CategorySchema
//     },
//   },
// });
