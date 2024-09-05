export type User = {
    id: string,
    fullname: string,
    email: string,
    phone: string,
    address: [
        {
            addressLine: string,
            isMain: boolean,
            phone: string,
            recipient: string
        }
    ],
    carts: [
        {
            id: string,
            size: string,
            qty: number
        }
    ],
    role: string,
    image: string,
    created_at: Date,
    updated_at: Date,
    password?: string,
    type?: string
}