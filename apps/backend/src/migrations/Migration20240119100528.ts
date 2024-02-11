import { Migration } from '@mikro-orm/migrations';

export class Migration20240119100528 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "fonts" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "file_path" varchar(255) not null, "preview" varchar(255) null, constraint "fonts_pkey" primary key ("id"));',
    );
    this.addSql('create index "fonts_id_index" on "fonts" ("id");');
    this.addSql(
      'create index "fonts_created_at_index" on "fonts" ("created_at");',
    );
    this.addSql(
      'create index "fonts_updated_at_index" on "fonts" ("updated_at");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "fonts" cascade;');
  }
}
