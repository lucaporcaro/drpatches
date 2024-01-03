import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { resolve } from 'path';
import { config } from 'dotenv';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

config();

export default {
  type: 'postgresql',
  clientUrl: process.env.DB_URL,
  entities: [resolve('./dist/**/*.entity.js')],
  entitiesTs: [resolve('./src/**/*.entity.ts')],
  autoLoadEntities: true,
  metadataProvider: TsMorphMetadataProvider,
  seeder: {
    path: resolve('src/seeders'),
    pathTs: resolve('dist/seeders'),
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: resolve('./dist/migrations'),
    pathTs: resolve('./src/migrations'),
    transactional: true,
    snapshot: true,
    generator: TSMigrationGenerator,
  },
} satisfies MikroOrmModuleSyncOptions;
