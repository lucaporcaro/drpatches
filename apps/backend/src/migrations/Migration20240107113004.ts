import { Migration } from '@mikro-orm/migrations';

export class Migration20240107113004 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "products" add column "stripe_id" varchar(255) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop column "stripe_id";');
  }
}
