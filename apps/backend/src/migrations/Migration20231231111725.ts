import { Migration } from '@mikro-orm/migrations';

export class Migration20231231111725 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'image\', \'text\'));');
    this.addSql('alter table "products" alter column "type" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'image\', \'text\'));');
    this.addSql('alter table "products" alter column "type" set not null;');
  }

}
