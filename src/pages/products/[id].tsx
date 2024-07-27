import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

const DetailProductPage = (props: PropTypes) => {

    const { setToaster } = props

    const { id } = useRouter().query
    const [product, setProduct] = useState<Product | {}>({})
    const [cart, setCart] = useState([])
    const session: any = useSession()

    const getDetailProduct = async (id: string) => {
        const { data } = await productServices.getDetailProduct(id)
        data.id = id
        setProduct(data.data)
    }

    const getCart = async () => {
        const { data } = await userServices.getCart()
        if (data.data) {
            setCart(data.data)
        }
    }


    useEffect(() => {
        getDetailProduct(id as string)
        getCart()
    }, [id])

    useEffect(() => {
        if (session.data?.accessToken) {
            getCart()
        }
    },[session.data?.accessToken])

    return (
        <>
            <Head>
                <title>Products Detail</title>
            </Head>
            <DetailProductView product={product} cart={cart} productID={id} setToaster={setToaster} />
        </>
    )
}
export default DetailProductPage