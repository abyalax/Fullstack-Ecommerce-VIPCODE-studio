import { Product } from "@/types/product.type"
import styles from "./Products.module.scss"
import Image from "next/image"
import { convertIDR } from "@/utils/currency"
import Card from "./Card"

type PropTypes = {
    products: Product[]
}

const ProductView = (props: PropTypes) => {
    const { products } = props
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title}>All Product ({products.length})</h1>
            <div className={styles.product__main}>
                <div className={styles.product__main__filter}>
                    <div className={styles.product__main__filter__data}>
                        <h4 className={styles.product__main__filter__data__title}>
                            Gender
                        </h4>
                        <div className={styles.product__main__filter__data__list}>
                            <div className={styles.product__main__filter__data__list__item}>
                                <input type="checkbox" id="men" />
                                <label htmlFor="men" className={styles.product__main__filter__data__list__item__label}>
                                    Men
                                </label>
                            </div>
                            <div className={styles.product__main__filter__data__list__item}>
                                <input type="checkbox" id="women" />
                                <label htmlFor="women" className={styles.product__main__filter__data__list__item__label}>
                                    Women
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.product__main__content}>
                    {products.map((product) => (
                        <Card key={product.id} product={product}/>
                    ))}

                </div>
            </div>
        </div>
    )
}
export default ProductView