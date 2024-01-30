import { Migration } from '@mikro-orm/migrations';

export class Migration20240130104336 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" add column "is_ready_for_payment" boolean not null default false;');
    this.addSql('alter table "products" alter column "background_color" type varchar(255) using ("background_color"::varchar(255));');
    this.addSql('alter table "products" alter column "background_color" set default \'#fff\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" alter column "background_color" type varchar(255) using ("background_color"::varchar(255));');
    this.addSql('alter table "products" alter column "background_color" set default \'#111\';');
    this.addSql('alter table "products" drop column "is_ready_for_payment";');
  }

}
