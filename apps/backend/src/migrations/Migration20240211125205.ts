import { Migration } from '@mikro-orm/migrations';

export class Migration20240211125205 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "carts" add column "user_id" varchar(255) null;');
    this.addSql(
      'alter table "carts" add constraint "carts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "carts" add constraint "carts_user_id_unique" unique ("user_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "carts" drop constraint "carts_user_id_foreign";');

    this.addSql('alter table "carts" drop constraint "carts_user_id_unique";');
    this.addSql('alter table "carts" drop column "user_id";');
  }
}
