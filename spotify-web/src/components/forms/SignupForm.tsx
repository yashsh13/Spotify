'use client'

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignupType } from "@/src/types/auth/signup.types";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useSignup } from "@/src/services/auth/auth.mutation";
import { Spinner } from "@/src/components/ui/spinner";

const SignupForm = () => {
  const form = useForm<SignupType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  const signupMutation = useSignup();

  const onSubmit = (data: SignupType) => signupMutation.mutate(data);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to SignUp
        </CardDescription>
        <CardAction>
            <Button variant="link">Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller 
              name="email"
              control={form.control}
              render ={({ field, fieldState}) => (
                <Field data-invalid={fieldState.invalid} >
                  <FieldLabel>
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="example@email.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller 
              name="username"
              control={form.control}
              render ={({ field, fieldState}) => (
                <Field data-invalid={fieldState.invalid} >
                  <FieldLabel>
                    Username <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller 
              name="password"
              control={form.control}
              render ={({ field, fieldState}) => (
                <Field data-invalid={fieldState.invalid} >
                  <FieldLabel>
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller 
              name="confirmPassword"
              control={form.control}
              render ={({ field, fieldState}) => (
                <Field data-invalid={fieldState.invalid} >
                  <FieldLabel>
                    Confirm Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          {signupMutation.isPending?
            (<Button type="submit" className="w-full my-5" disabled>
              SignUp
              <Spinner data-icon="inline-start" />
            </Button>):
            (<Button type="submit" className="w-full my-5">
              Signup
            </Button>)}
        </form>
      </CardContent>
    </Card>
  )
}

export default SignupForm;