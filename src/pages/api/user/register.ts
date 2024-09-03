import { signUp } from "@/services/auth/services";
import { responseFailed, responseMethodNotAllowed, responseSuccess } from "@/utils/responseAPI";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await signUp(req.body, (status: boolean) => {
            if (status) {
                return responseSuccess(res)
            } else {
               return responseFailed(res)
            }
        })
    } else {
        return responseMethodNotAllowed(res)
    }
}