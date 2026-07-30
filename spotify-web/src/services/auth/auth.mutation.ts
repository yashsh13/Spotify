import { useMutation } from "@tanstack/react-query";
import { LoginType } from "@/src/types/auth/login.types";
import * as apiCall from "@/src/services/auth/auth.api";
import { apiSuccessDisplay, apiErrorDisplay } from "@/src/utils/apiResponseDisplay";
import useAuthStore from "@/src/stores/authStore";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (body: LoginType) => apiCall.login(body),
        onSuccess: (response) => {
            const data = response.data.data;
            useAuthStore.getState().setAccessToken(data.accessToken);
            useAuthStore.getState().setUser(data.user.id, data.user.plan, data.user.role);
            apiSuccessDisplay(response);
            router.push('/dashboard');
        },
        onError: (error) => apiErrorDisplay(error)
    })
}