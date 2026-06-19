export const audioExtensionMap: Record<string, string> = {
    "audio/mpeg":"mp3",
    "audio/wav":"wav",
}

export const imageExtensionMap: Record<string, string> = {
    "image/png":"png",
    "image/jpg":"jpg",
    "image/jpeg":"jpeg"
}

const getExtension = (type: string) => {
    if(type.split('/')[0] === "audio") return audioExtensionMap[type];
    if(type.split('/')[0] === "image") return imageExtensionMap[type];
    return
}

export default getExtension;