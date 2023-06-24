// import { EntitySchema } from 'typeorm';
// import { Category } from './entities/category.entity';

// export const CategorySchema = new EntitySchema<Category>({
//   name: 'Category',
//   target: Category,
//   columns: {
//     id: {
//       type: Number,
//       primary: true,
//       generated: true,
//     },
//     name: {
//       type: String,
//     },
//     dateCreated: {
//       type: Date,
//     },
//     userId: {
//         type: Number,
//     }

//   },
//   relations: {
//     tasks: {
//       type: 'one-to-many',
//       target: 'Task', // the name of the TaskSchema
//     },
//   },
// });
