import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://youssef:Avido100*@youssefcluster.qndv23r.mongodb.net/?retryWrites=true&w=majority',
  database: 'YoussefCluster',
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
