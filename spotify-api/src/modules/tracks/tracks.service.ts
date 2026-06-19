import { putObjectUrl } from "../../helper/s3.js";
import { v4 as uuidv4 } from "uuid";
import getExtension from "../../helper/getExtension.js";
import { NotFoundError } from "../../utils/apiError.js";

export const putPreSignedUrl = async (type: string, prefix: string) => {
    const uuid = uuidv4();
    const extension = getExtension(type);
    if(!extension) throw new NotFoundError("File extension not found");

    const key = `${prefix}/${uuid}.${extension}`;
    const url = await putObjectUrl(key, type);

    return { url, key }
}
