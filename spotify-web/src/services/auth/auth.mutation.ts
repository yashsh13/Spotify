import { useMutation } from "@tanstack/react-query";
import { LoginType } from "@/src/types/auth/login.types";
import * as apiCall from "@/src/services/auth/auth.api";

export const useLogin = () => {
    return useMutation({
        mutationFn: (body: LoginType) => apiCall.login(body),
        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}