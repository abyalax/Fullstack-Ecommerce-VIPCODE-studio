import midtransClient from 'midtrans-client'

const snap = new midtransClient.Snap({
    isPorduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || '',
})

export default snap