import 'express';
import { Role, Plan } from '../generated/prisma/enums.ts';

export interface User {
    id: string,
    role: Role,
    plan: Plan
}

declare global{
    namespace Express{
        interface Request{
            user: User,
            validated: {
                body?: any,
                params?: any,
                query?: any
            }
        }
    }
}