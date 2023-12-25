import { Migration } from '@mikro-orm/migrations';

export class Migration20231224123637 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "addresses" ("id" varchar(255) not null, "receiver_name" varchar(255) not null, "receiver_phone" varchar(255) not null, "province" varchar(255) not null, "city" varchar(255) not null, "zip_code" varchar(255) not null, "location" varchar(255) not null, "user_id" varchar(255) not null, constraint "addresses_pkey" primary key ("id"));');
    this.addSql('create index "addresses_id_index" on "addresses" ("id");');
    this.addSql('alter table "addresses" add constraint "addresses_receiver_name_unique" unique ("receiver_name");');
    this.addSql('alter table "addresses" add constraint "addresses_receiver_phone_unique" unique ("receiver_phone");');
    this.addSql('alter table "addresses" add constraint "addresses_province_unique" unique ("province");');
    this.addSql('alter table "addresses" add constraint "addresses_city_unique" unique ("city");');
    this.addSql('alter table "addresses" add constraint "addresses_zip_code_unique" unique ("zip_code");');
    this.addSql('alter table "addresses" add constraint "addresses_location_unique" unique ("location");');
    this.addSql('create index "addresses_user_id_index" on "addresses" ("user_id");');

    this.addSql('alter table "addresses" add constraint "addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "addresses" cascade;');
  }

}
