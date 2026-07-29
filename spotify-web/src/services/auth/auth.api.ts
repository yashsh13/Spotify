import api from "@/src/utils/api";
import { LoginType } from "@/src/types/auth/login.types";

export const login = async (body: LoginType) => {
    return api.post('/api/v1/auth/login',
        { ...body }
    );
}