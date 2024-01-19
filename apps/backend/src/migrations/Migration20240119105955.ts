import { Migration } from '@mikro-orm/migrations';

export class Migration20240119105955 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "fonts" alter column "file_path" type varchar(255) using ("file_path"::varchar(255));');
    this.addSql('alter table "fonts" alter column "file_path" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "fonts" alter column "file_path" type varchar(255) using ("file_path"::varchar(255));');
    this.addSql('alter table "fonts" alter column "file_path" set not null;');
  }

}
