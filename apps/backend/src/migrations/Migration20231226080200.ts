import { Migration } from '@mikro-orm/migrations';

export class Migration20231226080200 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "addresses" add column "country" varchar(255) not null;');
    this.addSql('alter table "addresses" drop constraint "addresses_receiver_name_unique";');
    this.addSql('alter table "addresses" drop constraint "addresses_receiver_phone_unique";');
    this.addSql('alter table "addresses" drop constraint "addresses_province_unique";');
    this.addSql('alter table "addresses" drop constraint "addresses_city_unique";');
    this.addSql('alter table "addresses" drop constraint "addresses_zip_code_unique";');
    this.addSql('alter table "addresses" drop constraint "addresses_location_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "addresses" drop column "country";');
    this.addSql('alter table "addresses" add constraint "addresses_receiver_name_unique" unique ("receiver_name");');
    this.addSql('alter table "addresses" add constraint "addresses_receiver_phone_unique" unique ("receiver_phone");');
    this.addSql('alter table "addresses" add constraint "addresses_province_unique" unique ("province");');
    this.addSql('alter table "addresses" add constraint "addresses_city_unique" unique ("city");');
    this.addSql('alter table "addresses" add constraint "addresses_zip_code_unique" unique ("zip_code");');
    this.addSql('alter table "addresses" add constraint "addresses_location_unique" unique ("location");');
  }

}
