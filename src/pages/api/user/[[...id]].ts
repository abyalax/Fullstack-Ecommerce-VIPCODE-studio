import { deleteData,  retrieveData,  updateData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '@/utils/verifyToken';
import { responseData, responseFailed, responseMethodNotAllowed, responseSuccess } from '@/utils/responseAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        verify(req, res, true, async () => {
            const users = await retrieveData('users')
                const data = users.map((user: any) => {
                    delete user.password;
                    return user
                })
                return responseData(res, data)
        })
    }
    else if (req.method === "PUT") {
        const { id }: any = req.query
        const { data } = req.body
        verify(req, res, true, async () => {
            await updateData('users', `${id}`, data, (result: boolean) => {
                if (result) {
                    return responseSuccess(res)
                } else {
                    return responseFailed(res)
                }
            })
        })
    }
    else if (req.method === "DELETE") {
        const { id } = req.query
        verify(req, res, true, async () => {
            await deleteData('users', `${id}`, (result: boolean) => {
                if (result) {
                    return responseSuccess(res)
                } else {
                    return responseFailed(res)
                }
            })
        })
    }
    else {
        return responseMethodNotAllowed(res)
    }
} 