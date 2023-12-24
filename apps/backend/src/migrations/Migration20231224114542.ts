import { Migration } from '@mikro-orm/migrations';

export class Migration20231224114542 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "gender" text check ("gender" in (\'m\', \'f\')) not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('create index "users_id_index" on "users" ("id");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_phone_unique" unique ("phone");');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "gender" text check ("gender" in (\'m\', \'f\')) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_id_index" on "user" ("id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');

    this.addSql('drop table if exists "users" cascade;');
  }

}
