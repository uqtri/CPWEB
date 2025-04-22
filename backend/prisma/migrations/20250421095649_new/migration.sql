-- AlterTable
CREATE SEQUENCE testcase_id_seq;
ALTER TABLE "TestCase" ALTER COLUMN "id" SET DEFAULT nextval('testcase_id_seq');
ALTER SEQUENCE testcase_id_seq OWNED BY "TestCase"."id";
