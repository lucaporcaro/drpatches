import { Migration } from '@mikro-orm/migrations';

export class Migration20231224111500 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "gender" text check ("gender" in (\'m\', \'f\')) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_id_index" on "user" ("id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
