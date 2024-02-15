import { Migration } from '@mikro-orm/migrations';

export class Migration20240120071845 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_font_id_foreign";',
    );

    this.addSql(
      'alter table "products" alter column "font_id" type varchar(255) using ("font_id"::varchar(255));',
    );
    this.addSql('alter table "products" alter column "font_id" drop not null;');
    this.addSql(
      'alter table "products" add constraint "products_font_id_foreign" foreign key ("font_id") references "fonts" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_font_id_foreign";',
    );

    this.addSql(
      'alter table "products" alter column "font_id" type varchar(255) using ("font_id"::varchar(255));',
    );
    this.addSql('alter table "products" alter column "font_id" set not null;');
    this.addSql(
      'alter table "products" add constraint "products_font_id_foreign" foreign key ("font_id") references "fonts" ("id") on update cascade;',
    );
  }
}
