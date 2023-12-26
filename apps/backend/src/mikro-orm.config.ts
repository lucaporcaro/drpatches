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
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: resolve('./dist/migrations'),
    pathTs: resolve('./src/migrations'),
    transactional: true,
    snapshot: true,
    generator: TSMigrationGenerator,
  },
} satisfies MikroOrmModuleSyncOptions;
