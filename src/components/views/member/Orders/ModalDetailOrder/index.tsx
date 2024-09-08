import Modal from "@/components/ui/Modal"
import styles from "./ModalDetailProduct.module.scss"
import { Dispatch, Fragment, SetStateAction } from "react"
import { convertIDR } from "@/utils/currency"
import { Product } from "@/types/product.type"
import Image from "next/image"

type PropTypes = {
    setDetailOrder: Dispatch<SetStateAction<{}>>
    detailOrder: any
    products: Product[]
}

const ModalDetailOrder = (props: PropTypes) => {
    const { setDetailOrder, detailOrder, products } = props
    console.log({detailOrder});
    

    const getProduct = (id: string) => {
        const product = products.find((product: Product) => product.id === id)
        return product
    }

    return (
        <Modal onClose={() => setDetailOrder({})}>
            <h1 className={styles.modal__title}>Are U Sure ? </h1>
            <h2 className={styles.modal__subtitle}>Data Order</h2>
            <div className={styles.modal__data}>
                <div className={styles.modal__data__item}>
                    <h4>Order ID</h4>
                    <p>{detailOrder.order_id}</p>
                </div>
                <div className={styles.modal__data__item}>
                    <h4>Total</h4>
                    <p>{convertIDR(detailOrder.total)}</p>
                </div>
                <div className={styles.modal__data__item}>
                    <h4>Status</h4>
                    <p>{detailOrder.status}</p>
                </div>
            </div>
            <h2 className={styles.modal__subtitle}>Data Recipient</h2>
            <div className={styles.modal__data}>
                <div className={styles.modal__data__item}>
                    <h4>Name</h4>
                    <p>{detailOrder.address.recipient}</p>
                </div>
                <div className={styles.modal__data__item}>
                    <h4>Phone</h4>
                    <p>{detailOrder.address.phone}</p>
                </div>
                <div className={styles.modal__data__item}>
                    <h4>Note</h4>
                    <p>{detailOrder.address.note}</p>
                </div>
                <div className={styles.modal__data__item}>
                    <h4>Address</h4>
                    <p>{detailOrder.address.addressLine}</p>
                </div>
            </div>
            <h2 className={styles.modal__subtitle}>Data Product</h2>
            <div className={styles.modal__product}>
                {detailOrder.items.map((item: { id: string, size: string, qty: number }) => (
                    <Fragment key={`${item.id}-${item.size}`}>
                        <div className={styles.modal__product__item}>
                            {getProduct(item.id) &&
                                <Image
                                    className={styles.modal__product__item__image}
                                    src={`${getProduct(item.id)?.image}`}
                                    alt="product"
                                    width="150"
                                    height="150"
                                />
                            }
                            <div className={styles.modal__product__item__info}>
                                <h4 className={styles.modal__product__item__info__title}>
                                    {getProduct(item.id)?.name}
                                </h4>
                                <div className={styles.modal__product__item__info__data}>
                                    <label className={styles.modal__product__item__info__data__size}>
                                        Size {item.size}
                                    </label>
                                    <label className={styles.modal__product__item__info__data__qty}>
                                        Quantity {item.qty}
                                    </label>
                                </div>
                            </div>
                            <h4 className={styles.modal__product__item__price}>
                                {convertIDR(getProduct(item.id)?.price)}
                            </h4>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Modal>
    )
}
export default ModalDetailOrder