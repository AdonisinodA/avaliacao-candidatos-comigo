/*
  Warnings:

  - You are about to drop the column `collaborator_id` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_collaborator_id_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "collaborator_id";
