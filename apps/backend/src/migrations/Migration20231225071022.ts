import { Migration } from '@mikro-orm/migrations';

export class Migration20231225071022 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "role" text check ("role" in (\'admin\', \'customer\')) null default \'customer\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "role";');
  }

}
