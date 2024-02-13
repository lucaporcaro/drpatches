import { Migration } from '@mikro-orm/migrations';

export class Migration20240101132847 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" alter column "patch_width" type double precision using ("patch_width"::double precision);',
    );
    this.addSql(
      'alter table "products" alter column "patch_height" type double precision using ("patch_height"::double precision);',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" alter column "patch_width" type int using ("patch_width"::int);',
    );
    this.addSql(
      'alter table "products" alter column "patch_height" type int using ("patch_height"::int);',
    );
  }
}
