import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://awsomz:test123@cluster0.9zrymdb.mongodb.net/?retryWrites=true&w=majority',
  database: 'Cluster0',
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
