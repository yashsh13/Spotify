import api from "@/src/utils/api";
import { LoginType } from "@/src/types/auth/login.types";
import { SignupType } from "@/src/types/auth/signup.types";
import { VerifyType } from "@/src/types/auth/verify.types";

export const login = async (body: LoginType) => {
    return api.post('/api/v1/auth/login',
        body
    );
}

export const signup = async (body: SignupType) => {
    return api.post('/api/v1/auth/signup',
        body
    );
}

export const verify = async (body: VerifyType) => {
    return api.post('/api/v1/auth/verify-otp',
        body
    );
}