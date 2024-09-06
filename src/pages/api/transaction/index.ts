// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTransaction from '@/lib/transaction/transaction'
import { responseData } from '@/utils/responseAPI'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean,
  statusCode: number,
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`
  console.log(generateOrderId);
  
  const params = {
    "transaction_details": {
      "order_id": generateOrderId,
      "gross_amount": 2080000
    },
    "customer_details": {
      "first_name": "budi praja",
      "email": "budi@example.com",
      "phone": "081234567890"
    }
  }
  createTransaction(params, (transaction: { token: string, redirect_url: string }) => {
    console.log(transaction);
    responseData(res, transaction)
  })
}
