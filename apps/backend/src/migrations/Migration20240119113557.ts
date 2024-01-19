import { Migration } from '@mikro-orm/migrations';

export class Migration20240119113557 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patch_types" alter column "image" type varchar(255) using ("image"::varchar(255));');
    this.addSql('alter table "patch_types" alter column "image" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patch_types" alter column "image" type varchar(255) using ("image"::varchar(255));');
    this.addSql('alter table "patch_types" alter column "image" set not null;');
  }

}
