export type Product = {
    id: string
    name: string
    price: number
    image: string
    category: string
    created_at: Date
    updated_at: Date
    description?: string
    stock: [
        {
            size: string
            qty: number
        }
    ]
}