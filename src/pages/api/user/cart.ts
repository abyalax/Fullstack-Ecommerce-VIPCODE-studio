import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { responseData, responseFailed, responseNotFound, responseSuccess } from "@/utils/responseAPI";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        verify(req, res, false, async (decoded: { id: string }) => {
            const user: any = await retrieveDataById('users', decoded.id)
            if (user) {
                return responseData(res, user.carts)
            } else {
                return responseNotFound(res)
            }
        })
    } else if (req.method === "PUT") {
        const { data } = req.body
        verify(req, res, false,  async (decoded: { id: string }) => {
            await updateData('users', decoded.id, data, (result: boolean) => {
                if (result) {
                    return responseSuccess(res)
                } else {
                    return responseFailed(res)
                }
            })
        })
    }
}
