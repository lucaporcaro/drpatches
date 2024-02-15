import { Migration } from '@mikro-orm/migrations';

export class Migration20240103120834 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "backing_prices" add column "size" double precision not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "backing_prices" drop column "size";');
  }
}
