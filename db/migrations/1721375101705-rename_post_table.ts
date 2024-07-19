import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePostTable1721375101705 implements MigrationInterface {
    name = 'RenamePostTable1721375101705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_entity\` ADD CONSTRAINT \`FK_5e32998d7ac08f573cde04fbfa5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_entity\` DROP FOREIGN KEY \`FK_5e32998d7ac08f573cde04fbfa5\``);
        await queryRunner.query(`DROP TABLE \`post_entity\``);
    }

}
