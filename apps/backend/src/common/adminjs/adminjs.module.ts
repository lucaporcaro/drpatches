import { Module } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import User from 'src/modules/user/entities/user.entity';
import Product from 'src/modules/product/entities/product.entity';
import PatchType from 'src/modules/product/entities/patch-type.entity';
import { join, resolve } from 'path';
import BackingPrice from 'src/modules/product/entities/backing-price.entity';
import { config } from 'dotenv';
import Font from 'src/modules/font/entities/font.entity';
import { existsSync } from 'node:fs';
import { mkdir } from 'fs/promises';

config();

export const MEDIA_BUCKET =
  process.env.NODE_ENV === 'production'
    ? resolve('/media')
    : join(__dirname, '../../media');

const DEFAULT_ADMIN = {
  email: 'admin@user.com',
  password: 'password',
};

async function registerAdminJs() {
  const paths = [MEDIA_BUCKET];
  for (const path of paths) if (!existsSync(path)) await mkdir(path);

  const AdminJs = await import('adminjs');
  const AdminJsMikroOrm = await import('@adminjs/mikroorm');
  AdminJs.default.registerAdapter({
    Resource: AdminJsMikroOrm.Resource,
    Database: AdminJsMikroOrm.Database,
  });
  const componentLoader = new AdminJs.ComponentLoader();
  const components = {
    ImageView: componentLoader.add('ImageView', './components/Image.tsx'),
  };
  const FileUpload = await import('@adminjs/upload');
  const ImportExport = await import('@adminjs/import-export');
  const FileUploaderProvider = await import(
    './providers/file-uploader.provider.mjs'
  );
  return {
    components,
    orm: await MikroORM.init(),
    FileUpload,
    AdminJs,
    ImportExport,
    componentLoader,
    FileUploaderProvider,
  };
}

async function isAdmin(email: string, password: string) {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password)
    return Promise.resolve(DEFAULT_ADMIN);
  return null;
}

@Module({
  imports: [
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const {
        orm,
        FileUpload,
        componentLoader,
        components,
        ImportExport,
        FileUploaderProvider,
      } = await registerAdminJs();
      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            componentLoader,
            branding: {
              companyName: 'Dr.Patch',
              withMadeWithLove: false,
            },
            resources: [
              {
                resource: { model: User, orm },
              },
              {
                resource: { model: Font, orm },
                options: {
                  properties: {
                    image: {
                      components: {
                        show: components.ImageView,
                      },
                    },
                  },
                },
                features: [
                  FileUpload.default({
                    multiple: false,
                    componentLoader,
                    properties: {
                      key: 'file',
                      file: 'font',
                    },
                    provider: new FileUploaderProvider.default(MEDIA_BUCKET),
                  }),
                ],
              },
              {
                resource: { model: Product, orm },
                options: {
                  properties: {
                    image: {
                      components: {
                        show: components.ImageView,
                      },
                    },
                  },
                },
                features: [ImportExport.default({ componentLoader })],
              },
              {
                resource: { model: PatchType, orm },
                options: {
                  properties: {
                    description: {
                      isTitle: true,
                    },
                    image: {
                      components: {
                        show: components.ImageView,
                      },
                    },
                  },
                },
                features: [
                  ImportExport.default({ componentLoader }),
                  FileUpload.default({
                    componentLoader,
                    multiple: false,
                    properties: {
                      key: 'image',
                      file: 'file',
                    },
                    provider: new FileUploaderProvider.default(MEDIA_BUCKET),
                  }),
                ],
              },
              {
                resource: { model: BackingPrice, orm },
                options: {
                  properties: {
                    price: {
                      type: 'number',
                    },
                    size: {
                      type: 'number',
                    },
                  },
                },
                features: [ImportExport.default({ componentLoader })],
              },
            ],
          },
          auth: {
            authenticate: isAdmin,
            cookieName: 'amin_js_cookie',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      });
    }),
  ],
})
export class AdminjsModule {}
