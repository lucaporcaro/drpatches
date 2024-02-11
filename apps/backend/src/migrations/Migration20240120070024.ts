import { Migration } from '@mikro-orm/migrations';

export class Migration20240120070024 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" add column "font_id" varchar(255) not null;',
    );
    this.addSql(
      'alter table "products" add constraint "products_font_id_foreign" foreign key ("font_id") references "fonts" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_font_id_foreign";',
    );

    this.addSql('alter table "products" drop column "font_id";');
  }
}
