import { Migration } from '@mikro-orm/migrations';

export class Migration20240115070819 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop column "gender";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "gender" text check ("gender" in (\'m\', \'f\')) not null;');
  }

}
