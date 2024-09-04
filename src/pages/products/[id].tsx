import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<any[]>([]);
    const session: any = useSession();

    const getDetailProduct = async (id: string) => {
        try {
            const { data } = await productServices.getDetailProduct(id);
            if (data && data.data) {
                setProduct(data.data);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const getCart = async () => {
        try {
            const { data } = await userServices.getCart();
            if (data && data.data) {
                setCart(data.data);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        if (!session?.accessToken) {
            router.push('/auth/login');
            return;
        }

        if (id) {
            getDetailProduct(id as string);
            getCart();
        }
    }, [id, router, session?.accessToken]);

    if (!session?.accessToken) {
        return null; 
    }

    return (
        <>
            <Head>
                <title>Product Detail</title>
            </Head>
            <DetailProductView product={product} cart={cart} productID={id as string} />
        </>
    );
};

export default DetailProductPage;
