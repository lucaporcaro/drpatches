import { Migration } from '@mikro-orm/migrations';

export class Migration20231226120717 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "patch_types" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "image" varchar(255) not null, "description" varchar(255) null, constraint "patch_types_pkey" primary key ("id"));');
    this.addSql('create index "patch_types_id_index" on "patch_types" ("id");');
    this.addSql('create index "patch_types_created_at_index" on "patch_types" ("created_at");');
    this.addSql('create index "patch_types_updated_at_index" on "patch_types" ("updated_at");');

    this.addSql('create table "products" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" text check ("type" in (\'image\', \'text\')) not null, "text" varchar(255) null, "border_color" varchar(255) null, "text_color" varchar(255) null, "background_color" varchar(255) null, "patch_width" int not null, "patch_height" int not null, "quantity" int not null, "patch_type_id" varchar(255) not null, "backing_type" text check ("backing_type" in (\'da_cucire\', \'termoadesiva\', \'velcro_a\', \'velcro_b\', \'velcro_a_b\')) not null, "image" varchar(255) null, "price" double precision not null, "status" text check ("status" in (\'created\', \'paid\', \'delivered\', \'cancelled\')) not null, "user_id" varchar(255) not null, constraint "products_pkey" primary key ("id"));');
    this.addSql('create index "products_id_index" on "products" ("id");');
    this.addSql('create index "products_created_at_index" on "products" ("created_at");');
    this.addSql('create index "products_updated_at_index" on "products" ("updated_at");');
    this.addSql('create index "products_patch_type_id_index" on "products" ("patch_type_id");');
    this.addSql('create index "products_status_index" on "products" ("status");');
    this.addSql('create index "products_user_id_index" on "products" ("user_id");');

    this.addSql('alter table "products" add constraint "products_patch_type_id_foreign" foreign key ("patch_type_id") references "patch_types" ("id") on update cascade;');
    this.addSql('alter table "products" add constraint "products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');
    this.addSql('create index "users_created_at_index" on "users" ("created_at");');
    this.addSql('create index "users_updated_at_index" on "users" ("updated_at");');

    this.addSql('alter table "addresses" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');
    this.addSql('create index "addresses_created_at_index" on "addresses" ("created_at");');
    this.addSql('create index "addresses_updated_at_index" on "addresses" ("updated_at");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint "products_patch_type_id_foreign";');

    this.addSql('drop table if exists "patch_types" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop index "addresses_created_at_index";');
    this.addSql('drop index "addresses_updated_at_index";');
    this.addSql('alter table "addresses" drop column "created_at";');
    this.addSql('alter table "addresses" drop column "updated_at";');

    this.addSql('drop index "users_created_at_index";');
    this.addSql('drop index "users_updated_at_index";');
    this.addSql('alter table "users" drop column "created_at";');
    this.addSql('alter table "users" drop column "updated_at";');
  }

}
