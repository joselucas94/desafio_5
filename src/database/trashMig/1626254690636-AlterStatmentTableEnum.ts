import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterStatmentTableEnum1626254690636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "statements" DROP COLUMN "type"');
      await queryRunner.addColumn(
          "statements",
          new TableColumn({
            name: 'type',
            type: 'enum',
            enum: ['deposit', 'withdraw', 'transfer']
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
