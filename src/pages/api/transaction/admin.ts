import { retrieveData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '@/utils/verifyToken';
import { responseData, responseMethodNotAllowed } from '@/utils/responseAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        verify(req, res, true, async () => {
            const users = await retrieveData('users')
            let data: any = []
            users.forEach((user: any) => {
                if (user.transaction) {
                    const transaction = user.transaction.map((transaction: any) => {
                        return {
                            ...transaction,
                            user: {
                                id: user.id,
                                name: user.fullname
                            }
                        }
                    })
                    data = [...data, ...transaction]
                }
            })
            return responseData(res, data)
        })
    }
    else {
        return responseMethodNotAllowed(res)
    }
} 