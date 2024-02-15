import { Migration } from '@mikro-orm/migrations';

export class Migration20240211124538 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "carts" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "total_price" double precision not null default 0, "stripe_id" varchar(255) null, constraint "carts_pkey" primary key ("id"));',
    );
    this.addSql('create index "carts_id_index" on "carts" ("id");');
    this.addSql(
      'create index "carts_created_at_index" on "carts" ("created_at");',
    );
    this.addSql(
      'create index "carts_updated_at_index" on "carts" ("updated_at");',
    );

    this.addSql(
      'alter table "products" add column "cart_id" varchar(255) null;',
    );
    this.addSql(
      'alter table "products" add constraint "products_cart_id_foreign" foreign key ("cart_id") references "carts" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_cart_id_foreign";',
    );

    this.addSql('drop table if exists "carts" cascade;');

    this.addSql('alter table "products" drop column "cart_id";');
  }
}
