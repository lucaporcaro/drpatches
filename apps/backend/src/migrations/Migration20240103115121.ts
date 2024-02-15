import { Migration } from '@mikro-orm/migrations';

export class Migration20240103115121 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "backing_prices" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "price" bigint not null, "type" text check ("type" in (\'image\', \'text\')) not null, constraint "backing_prices_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "backing_prices_id_index" on "backing_prices" ("id");',
    );
    this.addSql(
      'create index "backing_prices_created_at_index" on "backing_prices" ("created_at");',
    );
    this.addSql(
      'create index "backing_prices_updated_at_index" on "backing_prices" ("updated_at");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "backing_prices" cascade;');
  }
}
