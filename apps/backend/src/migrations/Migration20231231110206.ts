import { Migration } from '@mikro-orm/migrations';

export class Migration20231231110206 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "patch_types" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "image" varchar(255) not null, "description" varchar(255) null, constraint "patch_types_pkey" primary key ("id"));');
    this.addSql('create index "patch_types_id_index" on "patch_types" ("id");');
    this.addSql('create index "patch_types_created_at_index" on "patch_types" ("created_at");');
    this.addSql('create index "patch_types_updated_at_index" on "patch_types" ("updated_at");');

    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'admin\', \'customer\')) null default \'customer\', "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "gender" text check ("gender" in (\'m\', \'f\')) not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('create index "users_id_index" on "users" ("id");');
    this.addSql('create index "users_created_at_index" on "users" ("created_at");');
    this.addSql('create index "users_updated_at_index" on "users" ("updated_at");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_phone_unique" unique ("phone");');

    this.addSql('create table "products" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" text check ("type" in (\'image\', \'text\')) not null, "text" varchar(255) null, "border_color" varchar(255) null default \'#111\', "text_color" varchar(255) null default \'#111\', "background_color" varchar(255) null default \'#111\', "patch_width" int not null default 10, "patch_height" int not null default 10, "quantity" int not null default 50, "patch_type_id" varchar(255) null, "backing_type" text check ("backing_type" in (\'da_cucire\', \'termoadesiva\', \'velcro_a\', \'velcro_b\', \'velcro_a_b\')) not null default \'da_cucire\', "image" varchar(255) null, "price" double precision not null default 0, "status" text check ("status" in (\'created\', \'paid\', \'delivered\', \'cancelled\')) not null default \'created\', "user_id" varchar(255) not null, constraint "products_pkey" primary key ("id"));');
    this.addSql('create index "products_id_index" on "products" ("id");');
    this.addSql('create index "products_created_at_index" on "products" ("created_at");');
    this.addSql('create index "products_updated_at_index" on "products" ("updated_at");');
    this.addSql('create index "products_patch_type_id_index" on "products" ("patch_type_id");');
    this.addSql('create index "products_status_index" on "products" ("status");');
    this.addSql('create index "products_user_id_index" on "products" ("user_id");');

    this.addSql('create table "addresses" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "receiver_name" varchar(255) not null, "receiver_phone" varchar(255) not null, "country" varchar(255) not null, "province" varchar(255) not null, "city" varchar(255) not null, "zip_code" varchar(255) not null, "location" varchar(255) not null, "user_id" varchar(255) not null, constraint "addresses_pkey" primary key ("id"));');
    this.addSql('create index "addresses_id_index" on "addresses" ("id");');
    this.addSql('create index "addresses_created_at_index" on "addresses" ("created_at");');
    this.addSql('create index "addresses_updated_at_index" on "addresses" ("updated_at");');
    this.addSql('create index "addresses_user_id_index" on "addresses" ("user_id");');

    this.addSql('alter table "products" add constraint "products_patch_type_id_foreign" foreign key ("patch_type_id") references "patch_types" ("id") on update cascade on delete set null;');
    this.addSql('alter table "products" add constraint "products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "addresses" add constraint "addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint "products_patch_type_id_foreign";');

    this.addSql('alter table "products" drop constraint "products_user_id_foreign";');

    this.addSql('alter table "addresses" drop constraint "addresses_user_id_foreign";');

    this.addSql('drop table if exists "patch_types" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "addresses" cascade;');
  }

}
