'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadTrackSchema, UploadTrackType } from "@/src/types/track/track.types";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent,SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { genres } from "@/src/lib/constants";
import { useGetPresignedUrls, usePutFileinS3, useUploadTrack } from "@/src/services/tracks/tracks.mutation";
import useFileStore from "@/src/stores/fileStore";
import { Spinner } from "../ui/spinner";

const UploadForm = () => {
    const form = useForm<UploadTrackType>({
        resolver: zodResolver(uploadTrackSchema),
        defaultValues: {
            name: "",
            artistName: "",
            genre: ""
        }
    });

    const getPresignedUrlMuatation = useGetPresignedUrls();
    const putFileinS3Mutation = usePutFileinS3();
    const uploadTrackMutation = useUploadTrack();

    const onSubmit = async ({ image: imageFile, audio: audioFile, ...data}: UploadTrackType) => {
        await getPresignedUrlMuatation.mutateAsync({
            imageType: imageFile.type,
            audioType: audioFile.type
        });

        const imageUrl = useFileStore.getState().imageUrl;
        const imageType = imageFile.type;
        if(!imageUrl) return

        await putFileinS3Mutation.mutateAsync({ url: imageUrl, file: imageFile, contentType: imageType });

        const audioUrl = useFileStore.getState().audioUrl;
        const audioType = audioFile.type;
        if(!audioUrl) return
        
        await putFileinS3Mutation.mutateAsync({ url: audioUrl, file: audioFile, contentType: audioType});

        const imageKey = useFileStore.getState().imageKey;
        const audioKey = useFileStore.getState().audioKey;
        if(!imageKey || !audioKey) return

        await uploadTrackMutation.mutateAsync({...data, coverPhoto: imageKey, audioFile: audioKey, duration: 250});
    };

    return (
        <Card className="w-full max-w-sm" size="sm">
         <CardHeader>
            <CardTitle>Upload Track</CardTitle>
            <CardDescription>
                Enter Track details and upload
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                Track Name <span className="text-destructive">*</span>
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
                        name="artistName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                Artists <span className="text-destructive">*</span>
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
                        name="genre"
                        control={form.control}
                        render = {({ field, fieldState}) => (
                            <Field orientation={"responsive"} data-invalid={ fieldState.invalid }>
                                <FieldLabel>
                                    Genre <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}>
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Select a Genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {genres.map((genre) => (
                                        <SelectItem key={genre.value} value={genre.value}>
                                        {genre.label}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="image"
                        control={form.control}
                        render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                Image File <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                aria-invalid={fieldState.invalid}
                                {...fieldProps}
                                onChange={(e) => {
                                    onChange(e.target.files && e.target.files[0])
                                }}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="audio"
                        control={form.control}
                        render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                Audio File <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                type="file"
                                accept="audio/*"
                                aria-invalid={fieldState.invalid}
                                {...fieldProps}
                                onChange={(e) => {
                                    onChange(e.target.files && e.target.files[0])
                                }}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                {( uploadTrackMutation.isPending || putFileinS3Mutation.isPending || getPresignedUrlMuatation.isPending)?
                    (<Button type="submit" className="w-full my-5" disabled>
                        Upload
                    <Spinner data-icon="inline-start" />
                    </Button>):
                    (<Button type="submit" className="w-full my-5">
                        Upload
                    </Button>)}
            </form>
         </CardContent>
        </Card>
    )
}

export default UploadForm;