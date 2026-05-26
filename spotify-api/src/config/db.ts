import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import parsedEnv from "./env";

const adapter = new PrismaPg({
    connectionString: parsedEnv.DATABASE_URL
});

const globalForPrisma = global as unknown as { prisma: PrismaClient};

const prismaClient = globalForPrisma.prisma || new PrismaClient({ adapter });

if(parsedEnv.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient;

export default prismaClient;