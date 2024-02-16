import { Migration } from '@mikro-orm/migrations';

export class Migration20240215191747 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_phone_unique";');

    this.addSql('alter table "carts" add column "status" text check ("status" in (\'open\', \'close\')) not null default \'open\';');
    this.addSql('alter table "carts" drop constraint "carts_user_id_unique";');
    this.addSql('create index "carts_status_index" on "carts" ("status");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add constraint "users_phone_unique" unique ("phone");');

    this.addSql('drop index "carts_status_index";');
    this.addSql('alter table "carts" drop column "status";');
    this.addSql('alter table "carts" add constraint "carts_user_id_unique" unique ("user_id");');
  }

}
