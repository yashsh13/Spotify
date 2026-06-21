import 'express';
import { Role } from '../generated/prisma/enums.ts';

export interface User {
    id: string,
    role: Role
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