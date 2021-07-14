import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterStatmentTable1626214374628 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "statements",
      new TableColumn(
        {
          name: "sender_id",
          type: "uuid"
        }));
    await queryRunner.addColumn(
      "statements",
      new TableColumn(
        {
          name: "receiver_id",
          type: "uuid"
        }));

    const foreignKey = new TableForeignKey(
      {
        name: "FKReceiver",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["receiver_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      })

    await queryRunner.createForeignKey("statements", foreignKey);
    const foreignKey2 = new TableForeignKey(
      {
        name: "FKSender",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["sender_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
    await queryRunner.createForeignKey("statements", foreignKey2);
  }

    public async down(queryRunner: QueryRunner): Promise < void> {
}

}
