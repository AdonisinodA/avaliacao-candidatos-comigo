/*
  Warnings:

  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "term" TIMESTAMP(3) NOT NULL;
