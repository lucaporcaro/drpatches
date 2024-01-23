import {
  AfterUpdate,
  Collection,
  Entity,
  EventArgs,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { createCanvas, registerFont } from 'canvas';
import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { concatMap, defer, from, lastValueFrom } from 'rxjs';
import BaseModel from 'src/common/entities/base-model.entity';
import Product from 'src/modules/product/entities/product.entity';
import { ulid } from 'ulid';

@Entity({ tableName: 'fonts' })
export default class Font extends BaseModel {
  @Property()
  name: string;

  @Property({ name: 'file_path', nullable: true })
  file: string;

  @Property({ nullable: true })
  image: string;

  @OneToMany(() => Product, (product) => product.font)
  products = new Collection<Product>(this);

  private MEDIA_BUCKET =
    process.env.NODE_ENV === 'production'
      ? resolve('/media')
      : join(__dirname, '/../../../media');

  @AfterUpdate()
  public async afterUpdate({ entity, em }: EventArgs<Font>) {
    if (!entity.file || entity.file === 'undefined') return;
    const preview$ = from(this.generatePreviewImage(entity.name, entity.file));
    const filename$ = defer(() =>
      preview$.pipe(concatMap((preview) => from(this.savePreview(preview)))),
    );

    await lastValueFrom(
      defer(() =>
        filename$.pipe(
          concatMap((filename) =>
            from(em.nativeUpdate(Font, { id: entity.id }, { image: filename })),
          ),
        ),
      ),
    );
  }

  private async generatePreviewImage(name: string, path: string) {
    registerFont(join(`${this.MEDIA_BUCKET}/${path}`), {
      family: 'Custom',
    });

    const canvas = createCanvas(200, 60);
    const ctx = canvas.getContext('2d');

    Object.assign(ctx, {
      font: '24px Custom',
      fillStyle: 'black',
      textAlign: 'center',
      textBaseline: 'middle',
    });

    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    const previewImage = canvas.toBuffer();

    return previewImage;
  }

  private async savePreview(file: Buffer) {
    const filename = ulid() + '-font-preview.png';
    await writeFile(join(`${this.MEDIA_BUCKET}/${filename}`), file);
    return filename;
  }
}
