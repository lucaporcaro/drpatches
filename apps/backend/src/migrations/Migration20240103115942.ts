import { Migration } from '@mikro-orm/migrations';

export class Migration20240103115942 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "backing_prices" alter column "price" type double precision using ("price"::double precision);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "backing_prices" alter column "price" type bigint using ("price"::bigint);');
  }

}
