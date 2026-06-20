/*
  Warnings:

  - Made the column `coverPhoto` on table `Track` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "coverPhoto" SET NOT NULL;
