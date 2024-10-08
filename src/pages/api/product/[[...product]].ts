import { addData, deleteData, retrieveData, retrieveDataById, updateData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '@/utils/verifyToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { product }: any = req.query
        if (product && product[0]) {
            const data = await retrieveDataById('products', product[0])
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: 'success',
                data,
            })
        } else {
            const data = await retrieveData('products')
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: 'success',
                data,
            })
        }

    }
    else if (req.method === "POST") {
        verify(req, res, true, async () => {
            let data = req.body
            data.created_at = new Date();
            data.updated_at = new Date();
            data.price = parseInt(data.price)
            data.stock.filter((stock: any) => {
                stock.qty = parseInt(stock.qty)
            })
            await addData('products', data, (status: boolean, result: any) => {
                if (status) {
                    res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'success',
                        data: { id: result.id }
                    })
                } else {
                    res.status(400).json({
                        status: false,
                        statusCode: 400,
                        message: 'failed',
                        data: {}
                    })
                }
            })
        })
    }
    else if (req.method === "PUT") {
        const { product }: any = req.query
        const { data } = req.body
        verify(req, res, true, async (decoded: { id: string }) => {
            await updateData('products', product[0], data, (status: boolean) => {
                if (status) {
                    res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'success',
                    })
                } else {
                    res.status(400).json({
                        status: false,
                        statusCode: 400,
                        message: 'failed',
                    })
                }
            })
        })
    }
    else if (req.method === "DELETE") {
        const { product }: any = req.query
        verify(req, res, true, async (decoded: { id: string }) => {
            await deleteData('products', product[0], (result: boolean) => {
                if (result) {
                    res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'success',
                    })
                } else {
                    res.status(400).json({
                        status: false,
                        statusCode: 400,
                        message: "failed"
                    })
                }
            })
        })
    }
}