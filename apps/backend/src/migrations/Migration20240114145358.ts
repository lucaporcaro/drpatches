import { Migration } from '@mikro-orm/migrations';

export class Migration20240114145358 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" add column "note" varchar(255) null default \'\';',
    );
    this.addSql(
      'alter table "products" alter column "text" type varchar(255) using ("text"::varchar(255));',
    );
    this.addSql('alter table "products" alter column "text" set default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" alter column "text" drop default;');
    this.addSql(
      'alter table "products" alter column "text" type varchar(255) using ("text"::varchar(255));',
    );
    this.addSql('alter table "products" drop column "note";');
  }
}
