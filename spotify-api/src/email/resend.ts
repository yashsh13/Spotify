import { Resend } from "resend";
import parsedEnv from "../config/env.js";

const resendClient = new Resend(parsedEnv.RESEND_API_KEY);

export default resendClient;