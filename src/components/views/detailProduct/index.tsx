import { Product } from "@/types/product.type";
import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import userServices from "@/services/user";

type PropTypes = {
    product: Product | any;
    cart: [] | any;
    productID: string | string[] | undefined;
    setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductView = (props: PropTypes) => {
    const { product, cart, productID, setToaster } = props;
    const { status }: any = useSession();
    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState('');
    const [storedProduct, setStoredProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (product) {
            sessionStorage.setItem('product', JSON.stringify(product));
            setStoredProduct(product);
        }
    }, [product]);

    useEffect(() => {
        const handleRouteChange = () => {
            sessionStorage.removeItem('product');
        };
        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const productFromStorage = sessionStorage.getItem('product');
        if (productFromStorage) {
            setStoredProduct(JSON.parse(productFromStorage));
        }
    }, []);


    const handleAddToCart = async (product: any) => {
        if (selectedSize !== '') {
            let newCart = cart

            if (cart.filter((item: any) => item.id === productID && item.size === selectedSize).length > 0) {
                newCart = cart.map((item: any) => {
                    if (item.id === productID && item.size === selectedSize) {
                        item.qty += 1;
                    }
                    return item;
                });
            } else {
                newCart = [
                    ...cart, {
                        id: productID,
                        qty: 1,
                        size: selectedSize
                    }];
            }
            try {
                const result = await userServices.addToCart({ carts: newCart });
                if (result.status === 200) {
                    setSelectedSize('');
                    setToaster({
                        variant: 'success',
                        message: 'Success Add To Cart'
                    });
                }
            } catch (error) {
                setToaster({
                    variant: 'danger',
                    message: 'Failed Add To Cart'
                });
            }
        }
    };

    return (
        <div className={styles.detail}>
            <div className={styles.detail__main}>
                <div className={styles.detail__main__left}>
                    <Image
                        className={styles.detail__main__left__image}
                        src={storedProduct?.image || product?.image}
                        alt="product"
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.detail__main__right}>
                    <h1>{storedProduct?.name}</h1>
                    <h3 className={styles.detail__main__right__category}>
                        {storedProduct?.category}
                    </h3>
                    <h3 className={styles.detail__main__right__price}>
                        {convertIDR(storedProduct?.price)}
                    </h3>
                    <p className={styles.detail__main__right__description}>
                        {storedProduct?.description}
                    </p>
                    <div className={styles.detail__main__right__size}>
                        {storedProduct?.stock?.map((item: { size: string, qty: number }) => (
                            <div className={styles.detail__main__right__size__item} key={item.size}>
                                <input className={styles.detail__main__right__size__item__input}
                                    type="radio"
                                    id={`size-${item.size}`}
                                    name="size"
                                    disabled={item.qty === 0}
                                    onClick={() => setSelectedSize(item.size)}
                                    checked={selectedSize === item.size}
                                />
                                <label className={styles.detail__main__right__size__item__label}
                                    htmlFor={`size-${item.size}`}>
                                    {item.size}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Button className={styles.detail__main__right__add}
                        type={status === "authenticated" ? "submit" : "button"}
                        onClick={() => status === "unauthenticated" ? router.push(`/auth/login?callbackUrl=${router.asPath}`) : handleAddToCart(product)}>
                        Add To Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailProductView;
