-- DropForeignKey
ALTER TABLE "ListeningHistory" DROP CONSTRAINT "ListeningHistory_trackId_fkey";

-- DropForeignKey
ALTER TABLE "ListeningHistory" DROP CONSTRAINT "ListeningHistory_userId_fkey";

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
