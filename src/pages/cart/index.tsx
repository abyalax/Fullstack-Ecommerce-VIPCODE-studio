import CartView from "@/components/views/cart"
import productServices from "@/services/product"
import userServices from "@/services/user"
import Head from "next/head"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

const CartPage = (props: PropTypes) => {
    const [products, setProducts] = useState([])
    const { setToaster } = props
    const [cart, setCart] = useState([])

    const getCart = async () => {
        const { data } = await userServices.getCart()
        setCart(data.data)
    }

    const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts();
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
            getCart()
    }, [])


    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>
            <CartView cart={cart} products={products} setToaster={setToaster} />
        </>
    )
}
export default CartPage