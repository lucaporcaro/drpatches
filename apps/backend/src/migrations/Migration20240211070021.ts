import { Migration } from '@mikro-orm/migrations';

export class Migration20240211070021 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" alter column "border_color" type varchar(255) using ("border_color"::varchar(255));',
    );
    this.addSql(
      'alter table "products" alter column "border_color" set default \'#fff\';',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" alter column "border_color" type varchar(255) using ("border_color"::varchar(255));',
    );
    this.addSql(
      'alter table "products" alter column "border_color" set default \'#fff;',
    );
  }
}
