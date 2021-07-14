import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class MakeNullable1626224753560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "statements" DROP COLUMN "receiver_id"');
      await queryRunner.addColumn(
          "statements",
          new TableColumn({
              name: "receiver_id",
              type: "uuid",
              isNullable: true

          }));

          await queryRunner.query('ALTER TABLE "statements" DROP COLUMN "sender_id"');
      await queryRunner.addColumn(
          "statements",
          new TableColumn({
              name: "sender_id",
              type: "uuid",
              isNullable: true

          }));

          await queryRunner.changeColumn
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
