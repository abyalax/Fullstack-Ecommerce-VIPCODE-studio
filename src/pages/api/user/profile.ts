import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { responseAccessDenied, responseData, responseFailed, responseMethodNotAllowed, responseNotFound, responseSuccess } from "@/utils/responseAPI";
import { verify } from "@/utils/verifyToken";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import { DocumentData } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        verify(req, res, false, async (decoded: { id: string }) => {
            if (decoded) {
                const profile: DocumentData | undefined = await retrieveDataById('users', decoded.id);
                if (profile) {
                    profile.id = decoded.id
                    return responseData(res, profile)
                } else {
                    return responseNotFound(res)
                }
            } else {
                return responseAccessDenied(res)
            }
        })
    } 
    else if (req.method === "PUT") {
        const { data } = req.body
        verify(req, res, false, async (decoded: { id: string }) => {
            if (decoded) {
                if (data.newPassword) {
                    const passwordConfirm = await compare(data.oldPassword, data.encryptedPassword)
                    delete data.oldPassword
                    delete data.encryptedPassword
                    data.password = await bcrypt.hash(data.password, 10)
                    if (passwordConfirm) {
                        return responseSuccess(res)
                    } else {
                        return responseFailed(res)
                    }
                }
                await updateData('users', decoded.id, data, (result: boolean) => {
                    if (result) {
                        return responseSuccess(res)
                    } else {
                        return responseFailed(res)
                    }
                })
            } else {
                return responseAccessDenied(res)
            }
        })
    } else {
        return responseMethodNotAllowed(res)
    }
}