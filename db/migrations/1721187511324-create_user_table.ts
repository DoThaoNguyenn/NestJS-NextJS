import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1721187511324 implements MigrationInterface {
    name = 'CreateUserTable1721187511324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
    }

}
