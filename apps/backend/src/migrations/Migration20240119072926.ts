import { Migration } from '@mikro-orm/migrations';

export class Migration20240119072926 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "users" add column "fiscal" varchar(255) null;');
    this.addSql(
      'alter table "users" add constraint "users_fiscal_unique" unique ("fiscal");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_fiscal_unique";');
    this.addSql('alter table "users" drop column "fiscal";');
  }
}
