// import { deleteData, retrieveData, updateData } from '@/lib/firebase/service';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { verify } from '@/utils/verifyToken';
// import { responseData, responseFailed, responseMethodNotAllowed, responseSuccess } from '@/utils/responseAPI';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "GET") {
//         verify(req, res, true, async () => {
//             const users = await retrieveData('users')
//                 const data = users.map((user: any) => {
//                     delete user.password;
//                     return user
//                 })
//                 return responseData(res, data)
//         })
//     } else {
//         return responseMethodNotAllowed(res)
//     }
// } 