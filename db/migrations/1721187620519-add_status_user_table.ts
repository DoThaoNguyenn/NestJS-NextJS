import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusUserTable1721187620519 implements MigrationInterface {
    name = 'AddStatusUserTable1721187620519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}
