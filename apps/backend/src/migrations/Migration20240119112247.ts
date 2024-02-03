import { Migration } from '@mikro-orm/migrations';

export class Migration20240119112247 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "fonts" rename column "preview" to "image";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "fonts" rename column "image" to "preview";');
  }
}
