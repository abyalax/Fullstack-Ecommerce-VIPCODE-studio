import {  Fragment, useContext } from "react"
import styles from "./Cart.module.scss"
import { Product } from "@/types/product.type"
import Image from "next/image"
import { convertIDR } from "@/utils/currency"
import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import userServices from "@/services/user"
import { ToasterContext } from "@/context/ToasterContext"

type PropTypes = {
    cart: any
    products: Product[]
}

const CartView = (props: PropTypes) => {

    const { cart, products } = props
    const {setToaster} = useContext(ToasterContext)

    const getProduct = (id: string) => {
        const product = products.find((product) => product.id === id)
        return product
    }

    const getOptionSize = (id: string, selected: string) => {
        const product = products.find((product) => product.id === id)
        const options = product?.stock.map((stock: { size: string, qty: number }) => {
            if (stock.qty > 0) {
                return {
                    label: stock.size,
                    value: stock.qty,
                    selected: stock.size === selected
                }
            }
        })
        const data = options?.filter((option) => option !== undefined)
        return data
    }

    const getTotalPrice = () => {
        if (cart !== undefined) {
            const total = cart.reduce(
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

    const handleDeleteCart = async (id: string, size: string) => {
        const newCart = cart.filter((item: {id: string, size: string}) => {
            return item.id !== id || item.size !== size
        })
        try {
            const result = await userServices.addToCart({
                carts: newCart
            })
            if (result.status === 200) {
                setToaster({
                    variant: "success",
                    message: "Cart deleted successfully"
                })
            }
        } catch (error) {
            console.log(error);
            setToaster({
                variant: "danger",
                message: "Something went wrong"
            })
        }
    }
    return (
        <div className={styles.cart}>
            <div className={styles.cart__main}>
                <h1 className={styles.cart__main__title}>Cart</h1>
                <div className={styles.cart__main__list}>
                    {cart !== undefined &&cart.map((item: { id: string, size: string, qty: number }) => (
                        <Fragment key={`${item.id}-${item.size}`}>
                            <div className={styles.cart__main__list__item}>
                                {getProduct(item.id) &&
                                    <Image
                                        className={styles.cart__main__list__item__image}
                                        src={`${getProduct(item.id)?.image}`}
                                        alt="product"
                                        width="150"
                                        height="150"
                                    />
                                }
                                <div className={styles.cart__main__list__item__info}>
                                    <h4 className={styles.cart__main__list__item__info__title}>
                                        {getProduct(item.id)?.name}
                                    </h4>
                                    <label className={styles.cart__main__list__item__info__category}>
                                        {getProduct(item.id)?.category}
                                    </label>
                                    <div className={styles.cart__main__list__item__info__data}>
                                        <label className={styles.cart__main__list__item__info__data__size}>
                                            Size
                                            <Select
                                                name="size"
                                                options={getOptionSize(item.id, item.size)}
                                            />
                                        </label>
                                        <label className={styles.cart__main__list__item__info__data__qty}>
                                            Quantity
                                            <Input
                                                className={styles.cart__main__list__item__info__data__qty__input}
                                                name="qty"
                                                type="number"
                                                defaultValue={item.qty}
                                                disabled
                                            />
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.cart__main__list__item__info__delete}
                                        onClick={() => { handleDeleteCart(item.id, item.size) }}>
                                        <i className='bx bxs-trash' />
                                    </button>
                                </div>
                                <h4 className={styles.cart__main__list__item__price}>
                                    {convertIDR(getProduct(item.id)?.price)}
                                </h4>
                            </div>
                            <hr className={styles.cart__main__list__divider} />
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className={styles.cart__summary}>
                <h1 className={styles.cart__summary__title}>Summary</h1>
                <div className={styles.cart__summary__item}>
                    <h4>Subtotal</h4>
                    <p>{convertIDR(getTotalPrice())}</p>
                </div>
                <div className={styles.cart__summary__item}>
                    <h4>Delivery</h4>
                    <p>{convertIDR(0)}</p>
                </div>
                <div className={styles.cart__summary__item}>
                    <h4>Tax</h4>
                    <p>{convertIDR(0)}</p>
                </div>
                <hr />
                <div className={styles.cart__summary__item}>
                    <h4>Total</h4>
                    <p>{convertIDR(getTotalPrice())}</p>
                </div>
                <hr />
                <Button
                    className={styles.cart__summary__button}
                    type="button"
                    onClick={() => console.log("Checkout")}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}
export default CartView