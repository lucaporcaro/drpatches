import { Migration } from '@mikro-orm/migrations';

export class Migration20240110122641 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_user_id_foreign";',
    );

    this.addSql(
      'alter table "products" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));',
    );
    this.addSql('alter table "products" alter column "user_id" drop not null;');
    this.addSql(
      'alter table "products" add constraint "products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_user_id_foreign";',
    );

    this.addSql(
      'alter table "products" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));',
    );
    this.addSql('alter table "products" alter column "user_id" set not null;');
    this.addSql(
      'alter table "products" add constraint "products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }
}
