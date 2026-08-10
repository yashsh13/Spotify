export type GetPresignedUrlType = {
    audioType: string,
    imageType: string
}

export type PutFileInS3Type = {
    url: string, 
    file: File, 
    contentType: string
}