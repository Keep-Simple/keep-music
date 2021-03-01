import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1614593781531 implements MigrationInterface {
    name = 'Initial1614593781531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "song" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "byteSize" integer NOT NULL, "duration" integer NOT NULL, "views" integer NOT NULL DEFAULT '0', "order" integer NOT NULL, "format" character varying NOT NULL, "albumId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "info" character varying NOT NULL DEFAULT 'No info about this author', "avatar" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/keep-music/image/upload/v1612702273/1_W35QUSvGpcLuxPo3SRTH4w_fgdqjy.png', "photos" text array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_d3962fd11a54d87f927e84d1080" UNIQUE ("name"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "album" ("id" SERIAL NOT NULL, "cover" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/keep-music/image/upload/v1612702273/download_amboak.jpg', "name" character varying NOT NULL, "releaseYear" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "UQ_0254b10b628d39161124ba74408" UNIQUE ("name", "authorId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "song" ADD CONSTRAINT "FK_2347b7912d4e51efb37d74f52e3" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "song" ADD CONSTRAINT "FK_c529927ae410af49faaf2e239a5" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "album" ADD CONSTRAINT "FK_8260e1386a0fa66b057d520b97f" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "album" DROP CONSTRAINT "FK_8260e1386a0fa66b057d520b97f"`
        )
        await queryRunner.query(
            `ALTER TABLE "song" DROP CONSTRAINT "FK_c529927ae410af49faaf2e239a5"`
        )
        await queryRunner.query(
            `ALTER TABLE "song" DROP CONSTRAINT "FK_2347b7912d4e51efb37d74f52e3"`
        )
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TABLE "album"`)
        await queryRunner.query(`DROP TABLE "author"`)
        await queryRunner.query(`DROP TABLE "song"`)
    }
}
