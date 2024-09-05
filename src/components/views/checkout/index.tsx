import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import { convertIDR } from "@/utils/currency"
import Button from "@/components/ui/Button"
import userServices from "@/services/user"
import productServices from "@/services/product"
import { Product } from "@/types/product.type"
import styles from "./Checkout.module.scss"
import { User } from "@/types/user.type"
import ModalChangeAddress from "./ModalChangeAddress"


const CheckoutView = () => {

    const [profile, setProfile] = useState<User>()
    const [selectedAddress, setSelectedAddress] = useState<number>(0)
    const [changeAddress, setChangeAddress] = useState<{}>()
    const [carts, setCarts] = useState<[{ id: string, size: string, qty: number }]>([{ id: "", size: "", qty: 0 }])
    const [products, setProducts] = useState<Product[]>([])


    const getProfile = async () => {
        const { data } = await userServices.getProfile()
        setProfile(data.data || [])
        setCarts(data.data.carts || [])
        data?.data?.address?.filter((address: { isMain: boolean }, id: number) => {
            if (address.isMain) {
                setSelectedAddress(id)
            }
        })
    }

    const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts();
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
        getProfile()
    }, [])

    const getProduct = (id: string) => {
        const product = products.find((product: Product) => product.id === id)
        return product
    }

    const getTotalPrice = () => {
        if (profile?.carts !== undefined) {
            const total = profile?.carts.reduce(
                (acc: number, item: { id: string, size: string, qty: number }) => {
                    const product: any = getProduct(item.id)
                    const price = parseInt(product?.price)
                    return (acc += price * item.qty)
                },
                0,
            )
            return total
        }
    }

    return (
        <>
            <div className={styles.checkout}>
                <div className={styles.checkout__main}>
                    <h1 className={styles.checkout__main__title}>Checkout</h1>
                    <div className={styles.checkout__main__address}>
                        <h3 className={styles.checkout__main__address__title}>Shipping Address</h3>
                        {profile?.address ? (
                            <div className={styles.checkout__main__address__selected}>
                                <h4 className={styles.checkout__main__address__selected__title}>
                                    {profile?.address[selectedAddress]?.recipient} {' - '} {profile?.address[selectedAddress]?.phone}
                                </h4>
                                <p className={styles.checkout__main__address__selected__address}>
                                    {profile?.address[selectedAddress]?.addressLine}
                                </p>
                                <p className={styles.checkout__main__address__selected__note}>
                                    Note:
                                </p>
                                <Button type="button" onClick={() => setChangeAddress(true)}>
                                    {profile.address?.[0] ? 'Change Address' : 'Add New Address'}
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h2>No Address</h2>
                                <Button type="button" onClick={() => setChangeAddress(true)}>
                                    Set Your Address
                                </Button>
                            </>

                        )}
                    </div>
                    {carts?.length !== undefined && carts?.length > 0 ? (
                        <div className={styles.checkout__main__list}>
                            {carts.map((item: { id: string, size: string, qty: number }) => (
                                <Fragment key={`${item.id}-${item.size}`}>
                                    <div className={styles.checkout__main__list__item}>
                                        {getProduct(item.id) &&
                                            <Image
                                                className={styles.checkout__main__list__item__image}
                                                src={`${getProduct(item.id)?.image}`}
                                                alt="product"
                                                width="150"
                                                height="150"
                                            />
                                        }
                                        <div className={styles.checkout__main__list__item__info}>
                                            <h4 className={styles.checkout__main__list__item__info__title}>
                                                {getProduct(item.id)?.name}
                                            </h4>
                                            <div className={styles.checkout__main__list__item__info__data}>
                                                <label className={styles.checkout__main__list__item__info__data__size}>
                                                    Size {item.size}
                                                </label>
                                                <label className={styles.checkout__main__list__item__info__data__qty}>
                                                    Quantity {item.qty}
                                                </label>
                                            </div>
                                        </div>
                                        <h4 className={styles.checkout__main__list__item__price}>
                                            {convertIDR(getProduct(item.id)?.price)}
                                        </h4>
                                    </div>
                                    <hr className={styles.checkout__main__list__divider} />
                                </Fragment>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.checkout__main__empty}>
                            <h1 className={styles.checkout__main__empty__title}>Your Cart is Empty</h1>
                        </div>
                    )}
                </div>
                <div className={styles.checkout__summary}>
                    <h1 className={styles.checkout__summary__title}>Summary</h1>
                    <div className={styles.checkout__summary__item}>
                        <h4>Subtotal</h4>
                        <p>{convertIDR(getTotalPrice())}</p>
                    </div>
                    <div className={styles.checkout__summary__item}>
                        <h4>Delivery</h4>
                        <p>{convertIDR(0)}</p>
                    </div>
                    <div className={styles.checkout__summary__item}>
                        <h4>Tax</h4>
                        <p>{convertIDR(0)}</p>
                    </div>
                    <hr />
                    <div className={styles.checkout__summary__item}>
                        <h4>Total</h4>
                        <p>{convertIDR(getTotalPrice())}</p>
                    </div>
                    <hr />
                    <Button
                        className={styles.checkout__summary__button}
                        type="button"
                        disabled={profile?.address?.[0] === undefined}
                        onClick={() => { }}
                    >
                        Process Payment
                    </Button>
                </div>
            </div>
            {changeAddress &&
                <ModalChangeAddress
                    profile={profile}
                    setProfile={setProfile}
                    setChangeAddress={setChangeAddress}
                    setSelectedAddress={setSelectedAddress}
                    selectedAddress={selectedAddress}
                />}
        </>
    )
}
export default CheckoutView