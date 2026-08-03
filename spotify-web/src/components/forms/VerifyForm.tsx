'use client'

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OTPType } from "@/src/types/auth/verify.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { FieldGroup,Field, FieldError } from "@/src/components/ui/field";
import { Button } from "@/src/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/src/components/ui/input-otp";
import { useVerify } from "@/src/services/auth/auth.mutation";
import useEmailStore from "@/src/stores/emailStore";
import { Spinner } from "@/src/components/ui/spinner";

const VerifyForm = () => {
    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ""
        }
    })

    const verifyMutation = useVerify();

    const onSubmit = (data: OTPType) => {
        const email = useEmailStore.getState().email;
        if(!email) return;
        verifyMutation.mutate({ ...data, email});
    };

    return (
        <Card className="w-2xs">
         <CardHeader>
            <CardTitle>Enter your OTP</CardTitle>
                <CardDescription>
                    OTP sent on your mail
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                        name="otp"
                        control={form.control}
                        render={({ field, fieldState }) => (
                         <Field data-invalid={fieldState.invalid}>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot className="bg-background" index={0} />
                                    <InputOTPSlot className="bg-background" index={1} />
                                    <InputOTPSlot className="bg-background" index={2} />
                                    <InputOTPSlot className="bg-background" index={3} />
                                    <InputOTPSlot className="bg-background" index={4} />
                                    <InputOTPSlot className="bg-background" index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                               {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                         </Field>
                        )}
                        />
                    </FieldGroup>
                    {verifyMutation.isPending?
                    (<Button type="submit" className="w-full my-5" disabled>
                        Verify
                        <Spinner data-icon="inline-start" />
                    </Button>):
                    (<Button type="submit" className="w-full my-5">
                        Verify
                    </Button>)}
                </form>
            </CardContent>
        </Card>
    )
}

export default VerifyForm;