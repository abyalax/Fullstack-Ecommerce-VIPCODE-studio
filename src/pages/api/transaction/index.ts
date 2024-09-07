// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveDataById, updateData } from '@/lib/firebase/service'
import { createTransaction, getTransaction } from '@/lib/transaction/transaction'
import { responseData, responseFailed, responseSuccess } from '@/utils/responseAPI'
import { verify } from '@/utils/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean,
  statusCode: number,
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    verify(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = `${req.query.order_id}`
        getTransaction(order_id, async (result: any) => {
          responseData(res, result)
        })
      }
    })
  } else
    if (req.method === 'POST') {
      verify(req, res, false, async (decoded: { id: string }) => {
        const payload = req.body
        delete payload.user.address.isMain
        const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`
        const params = {
          transaction_details: {
            order_id: generateOrderId,
            gross_amount: payload.transaction.total
          },
          customer_details: {
            first_name: payload.user.fullname,
            email: payload.user.email,
            phone: payload.user.phone,
            shipping_address: {
              first_name: payload.user.address.recipient,
              phone: payload.user.address.phone,
              address: payload.user.address.addressLine,
            },
            item_details: payload.transaction.items
          }
        }
        createTransaction(params, async (transaction: { token: string, redirect_url: string }) => {
          const user: any = await retrieveDataById('users', decoded.id)
          let data: any = []
          const newTransaction = {
            ...payload.transaction,
            address: payload.user.address,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            status: 'pending',
            order_id: generateOrderId
          }
          if (user.transaction) {
            data = {
              transaction: [...user.transaction, newTransaction],
              carts: []
            }
          } else {
            data = {
              transaction: [newTransaction],
              carts: []
            }
          }
          await updateData('users', decoded.id, data, (result: boolean) => {
            if (result) {
              return responseData(res, {
                token: transaction.token,
                redirect_url: transaction.redirect_url
              })
            } else {
              return responseFailed(res)
            }
          })
        })
      })
    } else
      if (req.method === 'PUT') {
        verify(req, res, false, async (decoded: { id: string }) => {
          if (decoded.id) {
            const order_id = `${req.query.order_id}`
            getTransaction(order_id, async (result: any) => {
              const user: any = await retrieveDataById('users', decoded.id)
              const transaction = user.transaction.map((data: any) => {
                if (data.order_id === order_id) {
                  return {
                    ...data,
                    status: result.transaction_status,
                  }
                }
                return data
              })
              const data = { transaction }
              await updateData('users', decoded.id, data, (result: boolean) => {
                if (result) {
                  return responseSuccess(res)
                } else {
                  return responseFailed(res)
                }
              })
            })
          }
        })
      }

}
