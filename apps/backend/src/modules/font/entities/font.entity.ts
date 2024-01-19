import { BeforeUpdate, Entity, EventArgs, Property } from '@mikro-orm/core';
import { createCanvas, registerFont } from 'canvas';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import BaseModel from 'src/common/entities/base-model.entity';
import { ulid } from 'ulid';

@Entity({ tableName: 'fonts' })
export default class Font extends BaseModel {
  @Property()
  name: string;

  @Property({ name: 'file_path', nullable: true })
  file: string;

  @Property({ nullable: true })
  image: string;

  @BeforeUpdate()
  public async beforeUpdate({ entity }: EventArgs<Font>) {
    const preview = await this.generatePreviewImage(entity.name, entity.file);
    const filename = await this.savePreview(preview);
    entity.image = filename;
  }

  private async generatePreviewImage(name: string, path: string) {
    registerFont(join(__dirname, `/../../../media/${path}`), {
      family: 'Custom',
    });

    const canvas = createCanvas(200, 200);
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
    await writeFile(join(__dirname, `/../../../media/${filename}`), file);
    return filename;
  }
}
