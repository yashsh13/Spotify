import axios, { AxiosResponse } from "axios";
import { toast } from "../components/ui/toast";

export const apiSuccessDisplay = (response: AxiosResponse) => {
    toast.add({
        type: "success",
        title: response.data.message
    })
};

export const apiErrorDisplay = (error: Error) => {
    if(axios.isAxiosError(error)){
        toast.add({
            type: "error",
            title: error.response?.data.message
        });
    } else {
        toast.add({
            type: "error",
            title: "Something went wrong"
        });
    }
};